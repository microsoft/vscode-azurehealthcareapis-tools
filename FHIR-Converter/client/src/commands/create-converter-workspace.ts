import * as vscode from 'vscode';
import * as interaction from '../common/view/common-interaction-api';
import { ReminderError } from '../common/errors/reminder-error';
import localize from '../localize';
import { globals } from '../init/globals';
import * as fileUtils from '../common/utils/file-utils';

export async function createConverterWorkspaceCommand() {
	let templateFolder: vscode.Uri;
	let dataFolder: vscode.Uri;
	let workspacePath: vscode.Uri;

	// Select root template folder
	templateFolder = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		throw new ReminderError(localize('message.noTemplateFolderProvided'));
	}

	// Select data folder
	dataFolder = await interaction.openDialogSelectFolder(localize('message.selectDataFolder'));
	if (!dataFolder) {
		throw new ReminderError(localize('message.noDataFolderProvided'));
	}

	// Select workspace path
	workspacePath = await interaction.showDialogSaveWorkspace(localize('message.saveWorkspaceFileAs'), localize('common.workspaceFileExtension'));
	if (!workspacePath) {
		throw new ReminderError(localize('message.noWorkspacePathProvided'));
	}

	// Generate the basic workspace configuration
	const workspaceConfig = globals.settingManager.generateWorkspaceConfig(templateFolder.fsPath, dataFolder.fsPath);

	// Save the workspace configuration
	fileUtils.writePrettyJson(workspacePath.fsPath, workspaceConfig);

	// Open the workspace
	await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
}
