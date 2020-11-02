import * as vscode from 'vscode';
import { globals } from '../init/globals';
import { fhirConversion } from '../common/conversion';
import { getStatusBarString } from '../common/utils';
import localize from "../localize";

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
		vscode.window.showErrorMessage(localize("error.selectTemplate.prefix") + error.message);
	}
}