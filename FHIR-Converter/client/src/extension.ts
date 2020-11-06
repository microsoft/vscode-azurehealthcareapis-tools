/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { LanguageClient } from 'vscode-languageclient';
import { generateLanguageClient } from './init/language-client';
import { globals } from './init/globals';
import * as workspace from './common/workspace';
import * as vscode from 'vscode';
import { CommandID }  from './models/command-id';
import { registerCommand }  from './common/command';

let client: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
	// init workspace
	globals.context = context;
	workspace.initWorkspace();
	
	// register commands
	for (const item in CommandID) {
		// context.subscriptions.push(vscode.commands.registerCommand(commandID, commandHandler, commandID));
		registerCommand(context, CommandID[item]);
	}

	// Start the client. This will also launch the server
	client = generateLanguageClient(context);
	client.start();
}

export function deactivate(context: vscode.ExtensionContext): Thenable<void> | undefined {
	// Stops the language client if it was created
	if (!client) {
		return undefined;
	}
	return client.stop();
}
