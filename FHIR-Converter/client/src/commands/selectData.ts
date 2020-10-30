import * as vscode from 'vscode';
import { globals } from '../init/globals';
import { fhirConversion } from '../common/conversion';
import { getStatusBarString } from '../common/utils';
import { LABELS } from '../common/constants';

export async function selectDataCommand(event) {
	try{
		if(event && event.fsPath){
			globals.activeDataPath = event.fsPath;
			globals.context.workspaceState.update('microsoft.health.fhir.converter.activeDataPath', globals.activeDataPath);
			vscode.window.setStatusBarMessage(getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		}
		else{
			vscode.window.showErrorMessage(LABELS["messsage.failSelectData"]);
		}
	}
	catch(error){
		vscode.window.showErrorMessage(LABELS["error.selectData.prefix"] + error.message);
	}
}