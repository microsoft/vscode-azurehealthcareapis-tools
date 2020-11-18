/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { LanguageClient } from 'vscode-languageclient';
import { createLanguageClient } from './core/language-client/language-client';
import { globals } from './core/globals';
import localize from './i18n/localize';
import * as path from 'path';
import * as stringUtils from './core/common/utils/string-utils';
import * as configurationConstants from './core/common/constants/workspace-configuration';
import * as vscode from 'vscode';
import { createConverterWorkspaceCommand } from './view/user-commands/create-converter-workspace';
import { convertCommand } from  './view/user-commands/convert';
import { updateTemplateFolderCommand } from  './view/user-commands/update-template-folder';
import { selectTemplateCommand } from  './view/user-commands/select-template';
import { selectDataCommand } from  './view/user-commands/select-data';
import { registerCommand } from './view/common/commands/register-command';
import { SettingManager } from './core/settings/settings-manager';
import { setStatusBar } from './view/common/status-bar/set-status-bar';
import { ConfigurationError } from './core/common/errors/configuration-error';
import { converterWorkspaceExists } from './view/common/workspace/converter-workspace-exists';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	// Init setting manager
	globals.settingManager = new SettingManager(context, configurationConstants.ConfigurationSection);

	// Init workspace
	if (converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
		setStatusBar();
		let resultFolder: string = globals.settingManager.getWorkspaceConfiguration(configurationConstants.ResultFolderKey);
		if (!resultFolder) {
			resultFolder = path.join(globals.settingManager.context.storagePath, configurationConstants.DefaultResultFolderName);
			await globals.settingManager.updateWorkspaceConfiguration(configurationConstants.ResultFolderKey, resultFolder);
		}
		updateTemplateToWorkspaceFolder();
		vscode.workspace.onDidChangeConfiguration(async () => {
			updateTemplateToWorkspaceFolder();
		});
	}

	// Register commands
	registerCommand(context, 'microsoft.health.fhir.converter.createConverterWorkspace', createConverterWorkspaceCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.convert', convertCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.selectData', selectDataCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.selectTemplate', selectTemplateCommand);

	registerCommand(context, 'microsoft.health.fhir.converter.updateTemplateFolder', updateTemplateFolderCommand);

	// Start the client. This will also launch the server
	client = createLanguageClient(context);
	client.start();
}

export function deactivate(context: vscode.ExtensionContext): Thenable<void> | undefined {
	// Stops the language client if it was created
	if (!client) {
		return undefined;
	}
	return client.stop();
}

function updateTemplateToWorkspaceFolder() {
	const templateFolder: string = globals.settingManager.getWorkspaceConfiguration(configurationConstants.TemplateFolderKey);
	if (templateFolder) {
		const folders = vscode.workspace.workspaceFolders;
		const folderName = stringUtils.generatePrettyFolderName(templateFolder, localize('common.templateFolder.suffix'));
		if (!folders) {
			vscode.workspace.updateWorkspaceFolders(0, null, {uri: vscode.Uri.file(templateFolder), name: folderName});
		} else {
			vscode.workspace.updateWorkspaceFolders(0, 1, {uri: vscode.Uri.file(templateFolder), name: folderName});
		}
	} else {
		throw new ConfigurationError(localize('message.noTemplateFolderProvided'));
	}
}
