import * as vscode from 'vscode';
import { converterWorkspaceExists, openDialogSelectFolder } from '../common/utils';
import { LABELS } from '../common/constants';

export async function updateTemplateFolderCommand() {
	try{
		if(!converterWorkspaceExists()){
			return undefined;
		}
		
		let templateFolder:vscode.Uri = await openDialogSelectFolder(LABELS["messsage.selectRootTemplateFolder"], LABELS["messsage.noTemplateFolderProvided"]);
		if (!templateFolder){
			return undefined;
		}
		vscode.workspace.getConfiguration('fhirConverter').update('templateFolder', templateFolder.fsPath, false);
	}
	catch(error){
		vscode.window.showErrorMessage(LABELS["error.updateTemplateFolder.prefix"] + error.message);
	}
}