/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as path from 'path';
import * as vscode from 'vscode';
import * as engineConstants from '../common/constants/engine';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient';

export function createLanguageClient(context: vscode.ExtensionContext) {
		
	// Options to control the language server
	const serverOptions: ServerOptions = getServerOptions(context);

	// Options to control the language client
	const clientOptions: LanguageClientOptions = getClientOptions(engineConstants.TemplateFileExt);

	// Create the language client.
	return new LanguageClient(
		'microsoft.health.fhir.converter.languageServer',
		'FHIR Converter Language Server',
		serverOptions,
		clientOptions
	);
}

function getClientOptions(templateFileExt: string) {
	return {
		// Register the server for documents with the target file extention
		documentSelector: [{ scheme: 'file', pattern: `**/*${templateFileExt}` }],
	};
}

function getServerOptions(context: vscode.ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used

	return {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};
}
