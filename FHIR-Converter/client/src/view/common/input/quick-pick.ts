/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';

export async function showQucikPick(placeHolder: string, itemList: string[]) {
	const inputOption = {
		placeHolder: placeHolder,
		canPickMany: false,
		ignoreFocusOut: true,
	};
	return await vscode.window.showQuickPick(itemList, inputOption);
}
