/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { LanguageClient } from 'vscode-languageclient';
import { generateLanguageClient } from './init/language-client';
import { globals } from './init/globals';
import * as workspace from './common/workspace';
import * as vscode from 'vscode';
import { createConverterWorkspaceCommand } from './commands/createConverterWorkspace';
import { refreshPreviewCommand } from  './commands/refreshPreview';
import { updateTemplateFolderCommand } from  './commands/updateTemplateFolder';
import { selectTemplateCommand } from  './commands/selectTemplate';
import { selectDataCommand } from  './commands/selectData';
import { registerCommand } from './common/command';
let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	// init workspace
	globals.context = context;
	workspace.initWorkspace();

	// register commands
	registerCommand(context, 'microsoft.health.fhir.converter.createConverterWorkspace', createConverterWorkspaceCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.refreshPreview', refreshPreviewCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.selectData', selectDataCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.selectTemplate', selectTemplateCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.updateTemplateFolder', updateTemplateFolderCommand);

	// Start the client. This will also launch the server
	client = generateLanguageClient(context);
	client.start();
}

export function deactivate(context: vscode.ExtensionContext): Thenable<void> | undefined {
	// Stops the language client if it was created
	if (!client) {
		return undefined;
	}
	return client.stop();
}
