/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import { TemplateManagerFactory } from '../../core/template-manager/template-manager-factory';
import * as workspaceStateConstants from '../../core/common/constants/workspace-state';
import { showInputBox } from '../common/input/input-box';
import localize from '../../i18n/localize';

export async function loginRegistryCommand() {
	// Get the registry reference
	const registryName = await showInputBox(localize('message.inputYourRegistry'), workspaceStateConstants.RegistryKey);
	if (!registryName) {
		return undefined;
	}

	// Create the converter
	const templateManager = TemplateManagerFactory.getInstance().createTemplateManager();

	// Execute the login process
	const cmd = templateManager.login(registryName);
	const terminal = vscode.window.createTerminal({ name: 'FHIR Converter', hideFromUser: false});
	terminal.sendText(cmd);
	terminal.show();
}
