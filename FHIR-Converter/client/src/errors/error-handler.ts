import * as vscode from 'vscode';
import localize from '../localize';

export function handle(error: Error): void {
	if (error.name === 'error.reminder') {
		vscode.window.showInformationMessage(error.message);
	} else if (error.name) {
		vscode.window.showErrorMessage(localize(error.name, error.message));
	} else {
		vscode.window.showErrorMessage(localize('error.unexpected', error.message));
	}
}
