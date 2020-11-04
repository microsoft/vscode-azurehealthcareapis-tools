/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { LanguageClient } from 'vscode-languageclient';
import { generateLanguageClient } from './init/language-client';
import { createConverterWorkspaceCommand } from './commands/createConverterWorkspace';
import { refreshPreviewCommand } from  './commands/refreshPreview';
import { updateTemplateFolderCommand } from  './commands/updateTemplateFolder';
import { selectTemplateCommand } from  './commands/selectTemplate';
import { selectDataCommand } from  './commands/selectData';
import { globals } from './init/globals';
import * as workspace from './common/workspace';
import * as vscode from 'vscode';

var client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	globals.context = context;
	workspace.initWorkspace();

	const disposableCreateConverterWorkspace = vscode.commands.registerCommand(
		'microsoft.health.fhir.converter.createConverterWorkspace', 
		createConverterWorkspaceCommand
	);

	const disposableRefreshPreview = vscode.commands.registerCommand(
		'microsoft.health.fhir.converter.refreshPreview', 
		refreshPreviewCommand
	);

	const disposableUpdateTemplateFolder = vscode.commands.registerCommand(
		'microsoft.health.fhir.converter.updateTemplateFolder',
		updateTemplateFolderCommand
	);

	const disposableSelectTemplate = vscode.commands.registerCommand(
		'microsoft.health.fhir.converter.selectTemplate',
		selectTemplateCommand
	);

	const disposableSelectData = vscode.commands.registerCommand(
		'microsoft.health.fhir.converter.selectData',
		selectDataCommand
	);

	// Start the client. This will also launch the server
	client = generateLanguageClient(globals.context);
	client.start();
	
	globals.context.subscriptions.push(disposableCreateConverterWorkspace);
	globals.context.subscriptions.push(disposableRefreshPreview);
	globals.context.subscriptions.push(disposableUpdateTemplateFolder);
	globals.context.subscriptions.push(disposableSelectTemplate);
	globals.context.subscriptions.push(disposableSelectData);
}

export function deactivate(context: vscode.ExtensionContext): Thenable<void> | undefined {
	// Stops the language client if it was created
	if (!client) {
		return undefined;
	}
	return client.stop();
}
