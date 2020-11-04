import { ConverterError } from '../models/converter-error.model';
import * as vscode from 'vscode';
import localize from "../localize";

export class ErrorHandler{
	errorType: ConverterError;
	error: Error;
	constructor(errorType: ConverterError, error: Error) { 
		this.errorType = errorType;
		this.error = error;
	}

	handle(): void {
		vscode.window.showErrorMessage(localize(this.errorType + '.prefix') + this.error.message);
	}
}
