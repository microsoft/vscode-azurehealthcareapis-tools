import { ConverterError } from './error';
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
		if( this.errorType === ConverterError.createConverterWorkspaceError){
			this.display("error.createConverterWorkspace.prefix");
		}
		else if( this.errorType === ConverterError.refreshPreviewError){
			this.display("error.refreshPreview.prefix");
		}
		else if( this.errorType === ConverterError.selectDataError){
			this.display("error.selectData.prefix");
		}
		else if( this.errorType === ConverterError.selectTemplateError){
			this.display("error.selectTemplate.prefix");
		}
		else if( this.errorType === ConverterError.updateTemplateFolderError){
			this.display("error.selectTemplate.prefix");
		}
	}

	display(id: string): void{
		vscode.window.showErrorMessage(localize(id) + this.error.message);
	}
}
