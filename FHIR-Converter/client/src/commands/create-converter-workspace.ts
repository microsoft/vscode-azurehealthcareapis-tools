import * as vscode from 'vscode';
import * as utils from '../common/utils';
import * as interaction from '../common/interaction';
import { ReminderError } from '../common/errors/reminder-error';
import localize from '../localize';
import { globals } from '../init/globals';

export async function createConverterWorkspaceCommand() {
	let templateFolder: vscode.Uri;
	let dataFolder: vscode.Uri;
	let workspacePath: vscode.Uri;

	templateFolder = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		throw new ReminderError(localize('message.noTemplateFolderProvided'));
	}

	dataFolder = await interaction.openDialogSelectFolder(localize('message.selectDataFolder'));
	if (!dataFolder) {
		throw new ReminderError(localize('message.noDataFolderProvided'));
	}

	workspacePath = await interaction.showDialogSaveWorkspace(localize('message.saveWorkspaceFileAs'), localize('common.workspaceFileExtension'));
	if (!workspacePath) {
		throw new ReminderError(localize('message.noWorkspacePathProvided'));
	}

	const msg = globals.settingManager.generaterWorkspaceConfig(templateFolder.fsPath, dataFolder.fsPath);

	utils.writePrettyJson(workspacePath.fsPath, msg);

	await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
}
