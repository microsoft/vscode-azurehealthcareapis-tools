import { ConverterError } from '../models/converter-error.model';
import * as vscode from 'vscode';
import localize from "../localize";

export function	handle(errorType: ConverterError, error: Error): void {
	vscode.window.showErrorMessage(localize(this.errorType + '.prefix') + this.error.message);
}
