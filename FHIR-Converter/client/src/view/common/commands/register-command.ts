/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as vscode from 'vscode';
import { commandHandler } from './command-handler';

export function registerCommand(context: vscode.ExtensionContext, commandID: string, callback: any) {
	// Register command and add the disposable to subscriptions
	context.subscriptions.push(vscode.commands.registerCommand(commandID, commandHandler, callback));
}
