import * as vscode from 'vscode';
import localize from '../../../i18n/localize';
import { ReminderError } from '../errors/reminder-error';
import { ConfigurationError } from '../errors/configuration-error';
import { ConversionError } from '../errors/conversion-error';

export function handle(error: Error): void {
	if (error instanceof ReminderError) {
		vscode.window.showInformationMessage(error.message);
	} else if (error instanceof ConfigurationError || error instanceof ConversionError) {
		vscode.window.showErrorMessage(localize(error.name, error.message));
	} else {
		vscode.window.showErrorMessage(localize('error.unexpected', error.message));
	}
}
