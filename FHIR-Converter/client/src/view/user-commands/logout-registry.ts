/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import * as workspaceStateConstants from '../../core/common/constants/workspace-state';
import { TemplateManagerFactory } from '../../core/template-manager/template-manager-factory';
import localize from '../../i18n/localize';
import { showInputBox } from '../common/input/input-box';

export async function logoutRegistryCommand() {
	// Get the registry reference
	const registryName = await showInputBox(localize('message.inputYourRegistry'), workspaceStateConstants.RegistryKey);
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
