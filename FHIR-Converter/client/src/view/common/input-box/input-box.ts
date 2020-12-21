/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import { globals } from '../../../core/globals';
import * as vscode from 'vscode';

export async function showInputBox(placeHolder: string, worksapceKey: string) {
	const inputBoxOption = { placeHolder: placeHolder, ignoreFocusOut: true };
	let input = globals.settingManager.getWorkspaceState(worksapceKey);
	if (input) {
		inputBoxOption['value'] = input;
	}
	input = await vscode.window.showInputBox(inputBoxOption);
	if (input) {
		await globals.settingManager.updateWorkspaceState(worksapceKey, input);
		return input;
	}
	return undefined;
}
