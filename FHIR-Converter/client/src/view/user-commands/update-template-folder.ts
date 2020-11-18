/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import localize from '../../i18n/localize';
import * as vscode from 'vscode';
import * as interaction from '../common/file-dialog/file-dialog-interaction';
import * as configurationConstants from '../../core/common/constants/workspace-configuration';
import { globals } from '../../core/globals';

export async function updateTemplateFolderCommand() {

	// Select a root template folder
	const templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		return undefined;
	}

	// Update the configuration
	await globals.settingManager.updateWorkspaceConfiguration(configurationConstants.TemplateFolderKey, templateFolder.fsPath);
}
