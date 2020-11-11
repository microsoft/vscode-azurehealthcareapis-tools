/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { LanguageClient } from 'vscode-languageclient';
import { generateLanguageClient } from './init/language-client';
import { globals } from './init/globals';
import * as vscode from 'vscode';
import { createConverterWorkspaceCommand } from './commands/create-converter-workspace';
import { convertAndDiffCommand } from  './commands/convert-and-diff';
import { updateTemplateFolderCommand } from  './commands/update-template-folder';
import { selectTemplateCommand } from  './commands/select-template';
import { selectDataCommand } from  './commands/select-data';
import { registerCommand } from './commands/command-helper/register-command';
import { SettingManager } from './init/settings';
import { ConverterEngineFactory } from './core/converter-engine/converter-engine-factory';
import * as constants from './common/constants';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	// init workspace
	globals.settingManager = new SettingManager(context, constants.ConfigurationSection);
	await globals.settingManager.initWorkspace();
	globals.converterEngineFactory = new ConverterEngineFactory();

	// register commands
	registerCommand(context, 'microsoft.health.fhir.converter.createConverterWorkspace', createConverterWorkspaceCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.convertAndDiff', convertAndDiffCommand);

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
