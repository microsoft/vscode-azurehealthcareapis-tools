/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import localize from '../../../i18n/localize';
import * as vscode from 'vscode';
import * as interaction from '../../common/file-dialog/file-dialog-interaction';
import { TemplateManagerFactory } from '../../../core/template-manager/template-manager-factory';
import { PlatformHandler } from '../../../core/platform/platform-handler';
import * as fileUtils from '../../../core/common/utils/file-utils'; 
import * as cp from 'child_process';
import * as path from 'path';

export async function pullImage(imageReference, text) {
	// Add pull bar
	const pullBar: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	pullBar.text = `$(sync~spin) ${text}...`;
	pullBar.show();

	try {
		// Get the workspace folder to set the default folder in dialog
		let workspaceFolder = undefined;
		if (vscode.workspace.workspaceFile) {
			workspaceFolder = path.dirname(vscode.workspace.workspaceFile.fsPath);
		}

		// Select the output folder
		const outputFolder = await interaction.openDialogSelectFolder(localize('message.selectOutputFolder'), workspaceFolder);
		if (!outputFolder) {
			return undefined;
		}

		// Check if the directory is empty
		let force = false;
		if (! await fileUtils.isEmptyDir(outputFolder.fsPath)) {
			const select = await vscode.window.showWarningMessage(
				localize('message.nonEmptyFolderForcePushOrNot'), 
				localize('message.force'), 
				localize('message.cancel'));
			if (select ===  localize('message.force')) {
				force = true;
			} else {
				return undefined;
			}
		}
		
		// Create the template manager
		const templateManager = TemplateManagerFactory.getInstance().createTemplateManager();

		// Execute the pull process
		const output = templateManager.pullTemplates(imageReference, outputFolder.fsPath, force);
		
		// Show ouput message
		const buttonLabel = localize('message.openFolder');
		vscode.window.showInformationMessage(output.replace(/\n/g, '; '), buttonLabel)
		.then( (selected) => {
			if (selected === buttonLabel) {
				const openFolderCmd = PlatformHandler.getInstance().getPlatformData().openFolderCmd;
				cp.exec(`${openFolderCmd} "${outputFolder.fsPath}"`);
			}
		});
	} finally {
		// Hide the pull bar
		pullBar.hide();
	}
}
