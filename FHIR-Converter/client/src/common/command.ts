import * as vscode from 'vscode';
import { commandHandler } from '../commands/command-handler';

export function registerCommand(context: vscode.ExtensionContext, commandID: string, callback: any) {
	context.subscriptions.push(vscode.commands.registerCommand(commandID, commandHandler, callback));
}
