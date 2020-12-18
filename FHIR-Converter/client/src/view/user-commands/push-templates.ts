/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import * as workspaceStateConstants from '../../core/common/constants/workspace-state';
import * as workspaceConfigurationConstants from '../../core/common/constants/workspace-configuration';
import { globals } from '../../core/globals';
import { TemplateManagerFactory } from '../../core/template-manager/template-manager-factory';

export async function pushTemplatesCommand() {
	// Add push bar
	const pushBar: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	pushBar.text = '$(sync~spin) Pushing templates...';
	pushBar.show();

	try {
		// Get the image reference
		let inputBoxOption = { placeHolder: 'Input your image reference' };
		let imageReference = globals.settingManager.getWorkspaceState(workspaceStateConstants.ImageReferenceKey);
		if (imageReference) {
			inputBoxOption['value'] = imageReference;
		}
		imageReference = await vscode.window.showInputBox(inputBoxOption);
		if (imageReference) {
			await globals.settingManager.updateWorkspaceState(workspaceStateConstants.ImageReferenceKey, imageReference);
		} else {
			return undefined;
		}

		// Confirm the template folder
		inputBoxOption = { placeHolder: 'Input a folder to be pushed' };
		const templateFolder = globals.settingManager.getWorkspaceConfiguration(workspaceConfigurationConstants.TemplateFolderKey);
		if (templateFolder) {
			inputBoxOption['value'] = templateFolder;
		}
		const inputFolder = await vscode.window.showInputBox(inputBoxOption);
		if (!inputFolder) {
			return undefined;
		}

		// Create the template manager
		const templateManager = TemplateManagerFactory.getInstance().createTemplateManager();

		// Execute the push process
		const output = templateManager.pushTemplates(imageReference, inputFolder);
		
		// Show ouput message
		vscode.window.showInformationMessage(output.replace(/\n/g, '; '));
	} finally {
		// Hide the push bar
		pushBar.hide();
	}
}
