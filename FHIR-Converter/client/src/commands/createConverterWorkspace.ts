import * as vscode from 'vscode';
import { openDialogSelectFolder, generaterWorkspaceConfig, showDialogSaveWorkspace, wirtePrettyJson } from '../common/utils';
import { LABELS } from '../common/constants';

export async function createConverterWorkspaceCommand() {
	try{
		let templateFolder:vscode.Uri;
		let dataFolder:vscode.Uri;
		let workspacePath:vscode.Uri;

		templateFolder = await openDialogSelectFolder(LABELS["messsage.selectRootTemplateFolder"], LABELS["messsage.noTemplateFolderProvided"]);
		if (!templateFolder){
			return undefined;
		}

		dataFolder = await openDialogSelectFolder(LABELS["messsage.selectDataFolder"], LABELS["messsage.noDataFolderProvided"]);
		if (!dataFolder) {
			return undefined;
		}

		workspacePath = await showDialogSaveWorkspace(LABELS["messsage.saveWorkspaceFileAs"], LABELS["messsage.noWorkspacePathProvided"], LABELS["common.workspaceFileExtension"]);
		if (!workspacePath) {
			return undefined;
		}

		let msg = generaterWorkspaceConfig(templateFolder.fsPath, dataFolder);

		wirtePrettyJson(workspacePath.fsPath, msg);

		await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
	}
	catch(error){
		vscode.window.showErrorMessage(LABELS["error.createConverterWorkspace.prefix"] + error.message);
	}
}
