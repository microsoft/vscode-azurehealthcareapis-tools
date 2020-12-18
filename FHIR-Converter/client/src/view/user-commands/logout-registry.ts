/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import { TemplateManagerFactory } from '../../core/template-manager/template-manager-factory';

export async function logoutRegistryCommand() {
	// Get the registry name
	const inputBoxOption = { placeHolder: 'Input your registry' };
	const registryName = await vscode.window.showInputBox(inputBoxOption);
	if (!registryName) {
		return undefined;
	}

	// Create the converter
	const templateManager = TemplateManagerFactory.getInstance().createTemplateManager();

	// Execute the logout process
	const output = templateManager.logout(registryName);

	// Show ouput message
	vscode.window.showInformationMessage(output.replace(/\n/g, '; '));
}
