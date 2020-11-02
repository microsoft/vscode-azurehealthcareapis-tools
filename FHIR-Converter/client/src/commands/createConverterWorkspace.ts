import * as vscode from 'vscode';
import { openDialogSelectFolder, generaterWorkspaceConfig, showDialogSaveWorkspace, wirtePrettyJson } from '../common/utils';
import localize from "../localize";

export async function createConverterWorkspaceCommand() {
	try{
		let templateFolder:vscode.Uri;
		let dataFolder:vscode.Uri;
		let workspacePath:vscode.Uri;

		templateFolder = await openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder){
			return undefined;
		}

		dataFolder = await openDialogSelectFolder(localize("messsage.selectDataFolder"), localize("messsage.noDataFolderProvided"));
		if (!dataFolder) {
			return undefined;
		}

		workspacePath = await showDialogSaveWorkspace(localize("messsage.saveWorkspaceFileAs"), localize("messsage.noWorkspacePathProvided"), localize("common.workspaceFileExtension"));
		if (!workspacePath) {
			return undefined;
		}

		let msg = generaterWorkspaceConfig(templateFolder.fsPath, dataFolder);

		wirtePrettyJson(workspacePath.fsPath, msg);

		await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
	}
	catch(error){
		vscode.window.showErrorMessage(localize("error.createConverterWorkspace.prefix") + error.message);
	}
}
