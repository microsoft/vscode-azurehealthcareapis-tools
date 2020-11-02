import * as vscode from 'vscode';
import { globals } from '../init/globals';
import { fhirConversion } from '../common/conversion';
import { getStatusBarString } from '../common/utils';
import localize from "../localize";
import { ConverterError } from '../common/error';
import { ErrorHandler } from '../common/error-handler';

export async function selectTemplateCommand(event) {
	try{
		if(event && event.fsPath){
			globals.activeTemplatePath = event.fsPath;
			globals.context.workspaceState.update('microsoft.health.fhir.converter.activeTemplatePath', event.fsPath);
			vscode.window.setStatusBarMessage(getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		}
		else{
			vscode.window.showErrorMessage(localize("messsage.failSelectTemplate"));
		}
	}
	catch(error){
		new ErrorHandler(ConverterError.selectTemplateError, error).handle();
	}
}