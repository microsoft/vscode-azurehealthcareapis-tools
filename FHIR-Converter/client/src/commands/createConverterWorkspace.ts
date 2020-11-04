import * as vscode from 'vscode';
import * as utils from '../common/utils';
import * as workspace from '../common/workspace';
import * as interaction from '../common/interaction';
import localize from "../localize";
import { ConverterError } from '../models/converter-error.model';
import * as ErrorHandler from '../common/error-handler';

export async function createConverterWorkspaceCommand() {
	try {
		let templateFolder: vscode.Uri;
		let dataFolder: vscode.Uri;
		let workspacePath: vscode.Uri;

		templateFolder = await interaction.openDialogSelectFolder(localize("messsage.selectRootTemplateFolder"), localize("messsage.noTemplateFolderProvided"));
		if (!templateFolder) {
			return undefined;
		}

		dataFolder = await interaction.openDialogSelectFolder(localize("messsage.selectDataFolder"), localize("messsage.noDataFolderProvided"));
		if (!dataFolder) {
			return undefined;
		}

		workspacePath = await interaction.showDialogSaveWorkspace(localize("messsage.saveWorkspaceFileAs"), localize("messsage.noWorkspacePathProvided"), localize("common.workspaceFileExtension"));
		if (!workspacePath) {
			return undefined;
		}

		const msg = workspace.generaterWorkspaceConfig(templateFolder.fsPath, dataFolder);

		utils.wirtePrettyJson(workspacePath.fsPath, msg);

		await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
	} catch (error) {
		ErrorHandler.handle(ConverterError.createConverterWorkspaceError, error);
	}
}
