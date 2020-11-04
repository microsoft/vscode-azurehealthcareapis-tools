import * as vscode from 'vscode';
import * as workspace from '../common/workspace';
import * as interaction from '../common/interaction';
import localize from "../localize";
import { ConverterError } from '../models/converter-error.model';
import * as ErrorHandler from '../common/error-handler';

export async function updateTemplateFolderCommand() {
	try {
		if (!workspace.converterWorkspaceExists()) {
			return undefined;
		}
		const templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder) {
			return undefined;
		}
		vscode.workspace.getConfiguration('fhirConverter').update('templateFolder', templateFolder.fsPath, false);
	} catch (error) {
		ErrorHandler.handle(ConverterError.updateTemplateFolderError, error);
	}
}
