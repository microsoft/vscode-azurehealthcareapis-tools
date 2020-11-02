import * as vscode from 'vscode';
import { converterWorkspaceExists, openDialogSelectFolder } from '../common/utils';
import localize from "../localize";

export async function updateTemplateFolderCommand() {
	try{
		if(!converterWorkspaceExists()){
			return undefined;
		}
		
		let templateFolder:vscode.Uri = await openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder){
			return undefined;
		}
		vscode.workspace.getConfiguration('fhirConverter').update('templateFolder', templateFolder.fsPath, false);
	}
	catch(error){
		vscode.window.showErrorMessage(localize("error.updateTemplateFolder.prefix") + error.message);
	}
}