import * as vscode from 'vscode';
import { globals } from '../init/globals';
import { fhirConversion } from '../common/conversion';
import { getStatusBarString } from '../common/utils';
import { LABELS } from '../common/constants';

export async function selectTemplateCommand(event) {
	try{
		if(event && event.fsPath){
			globals.activeTemplatePath = event.fsPath;
			globals.context.workspaceState.update('microsoft.health.fhir.converter.activeTemplatePath', event.fsPath);
			vscode.window.setStatusBarMessage(getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		}
		else{
			vscode.window.showErrorMessage(LABELS["messsage.failSelectTemplate"]);
		}
	}
	catch(error){
		vscode.window.showErrorMessage(LABELS["error.selectTemplate.prefix"] + error.message);
	}
}