import * as vscode from 'vscode';
import { converterWorkspaceExists, openDialogSelectFolder } from '../common/utils';
import localize from "../localize";
import { ConverterError } from '../common/constants';
import { ErrorHandler } from '../common/error-handler';

export async function updateTemplateFolderCommand() {
	try{
		if(!converterWorkspaceExists()){
			return undefined;
		}
		
		let templateFolder: vscode.Uri = await openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder){
			return undefined;
		}
		vscode.workspace.getConfiguration('fhirConverter').update('templateFolder', templateFolder.fsPath, false);
	}
	catch(error){
		new ErrorHandler(ConverterError.updateTemplateFolderError, error).handle();
	}
}