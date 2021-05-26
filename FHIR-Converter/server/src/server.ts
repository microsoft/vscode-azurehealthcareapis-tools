/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import {
	createConnection,
	TextDocuments,
	Diagnostic,
	DiagnosticSeverity,
	ProposedFeatures,
	InitializeParams,
	CompletionItem,
	CompletionItemKind,
	TextDocumentPositionParams,
	TextDocumentSyncKind,
	InitializeResult,
	DefinitionParams,
	DefinitionLink
} from 'vscode-languageserver';

import {
	TextDocument
} from 'vscode-languageserver-textdocument';
import * as path from 'path';
import { SettingsManager } from './common/settings-manager';
import * as utils from './common/utils';
import localize from './i18n/localize';

// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager. The text document manager
// supports full document sync only
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let settingsManager: SettingsManager;

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	settingsManager = new SettingsManager(connection, capabilities, validateTextDocument);

	const hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Full,
			// Tell the client that the server supports code completion
			completionProvider: {
				resolveProvider: true
			},
			definitionProvider: true
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(async change => {
	await validateTextDocument(change.document);
});

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
	// The validator creates diagnostics for all uppercase words length 2 and more
	const text = textDocument.getText();
	const pattern = /(\{\%\s*include\s*\')([^\']*)/g;
	let m: RegExpExecArray | null;

	const templateFolder = await getTemplateFolder(textDocument.uri); 
	const templates = utils.getAllTemplatePaths(templateFolder);

	const diagnostics: Diagnostic[] = [];
	while ((m = pattern.exec(text))) {
		const partialTemplate = utils.addUnderlineExt((m)[2]);
		if (!templates.some(uri => uri === partialTemplate)) {
			const diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Error,
				range: {
					start: textDocument.positionAt(m.index + m[1].length),
					end: textDocument.positionAt(m.index + m[0].length)
				},
				message: localize('message.invalidTemplate', partialTemplate, templateFolder.replace(/\\/g, '/')),
				source: localize('microsoft.health.fhir.converter.configuration.title')
			};

			diagnostics.push(diagnostic);
		}
	}

	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

// This handler provides the initial list of the completion items.
connection.onCompletion( async (_textDocumentPosition: TextDocumentPositionParams): Promise<CompletionItem[]> => {
	const templates = utils.getAllTemplatePaths(await getTemplateFolder(_textDocumentPosition.textDocument.uri));
	const allPartialTemplates = [];
	let index = 0;
	for (let templatePath of templates) {
		const dirname = path.dirname(templatePath);
		const basename = path.basename(templatePath);
		if (basename === undefined) {
			continue;
		}
		templatePath = utils.getSnippetTemplateName(dirname, basename);
		allPartialTemplates.push(
			{
				label: templatePath,
				kind: CompletionItemKind.Text,
				data: index
			}
		);
		index++;
	}
	return allPartialTemplates;
});

// This handler resolves additional information for the item selected in the completion list.
connection.onCompletionResolve(
	(item: CompletionItem): CompletionItem => {
		return item;
	}
);

connection.onDefinition(async (params: DefinitionParams): Promise<DefinitionLink[]> => {
	const contextString = getSuroundingText(params);
	if (contextString === '') {
		return [];
	}

	const pattern = /\'(.*)\'/g;
	let match: RegExpExecArray | null;
	if ((match = pattern.exec(contextString)) !== null) {
		const relativeFilePath = utils.addUnderlineExt(match[1]);
		const templateFolder = await getTemplateFolder(params.textDocument.uri);
		if (utils.getAllTemplatePaths(templateFolder).some(uri => uri === relativeFilePath)) {
			const fileUri = 'file:///' + templateFolder + '/' + relativeFilePath;
			const firstChar = {
				start: {
					line: 0,
					character: 0
				},
				end: {
					line: 11,
					character: 0
				}
			};
			return [
				{
					targetUri: fileUri,
					targetRange: firstChar,
					targetSelectionRange: firstChar
				}
			];
		}
	}
	return [];
});


function getSuroundingText(location: TextDocumentPositionParams): string {
	const start = {
		line: location.position.line,
		character: 0
	};
	const end = {
		line: location.position.line + 1,
		character: 0
	}; 

	const targetLine = documents.get(location.textDocument.uri)?.getText({start, end}).trimRight();
	if (!targetLine) {
		return '';
	}

	let endIndex = targetLine.indexOf(' ', location.position.character);
	if (endIndex === -1) {
		endIndex = targetLine.length;
	}

	let startIndex = targetLine.lastIndexOf(' ', location.position.character);
	if (startIndex === -1) {
		startIndex = 0;
	}

	return targetLine.substring(startIndex, endIndex);
}

export async function getTemplateFolder(uri: string): Promise<string> {
	const templateFolder = path.normalize((await settingsManager.getDocumentSettings(uri)).templateFolder);
	return templateFolder;
}

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
