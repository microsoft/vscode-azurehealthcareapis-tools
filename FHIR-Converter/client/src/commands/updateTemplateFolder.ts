import * as vscode from 'vscode';
import * as workspace from '../common/workspace';
import * as interaction from '../common/interaction';
import localize from "../localize";
import { ConverterError } from '../models/converter-error.model';
import { ErrorHandler } from '../common/error-handler';

export async function updateTemplateFolderCommand() {
	try{
		if(!workspace.converterWorkspaceExists()){
			return undefined;
		}
		
		let templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder){
			return undefined;
		}
		vscode.workspace.getConfiguration('fhirConverter').update('templateFolder', templateFolder.fsPath, false);
	}
	catch(error){
		new ErrorHandler(ConverterError.updateTemplateFolderError, error).handle();
	}
}