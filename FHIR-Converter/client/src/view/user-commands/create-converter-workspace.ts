import localize from '../../i18n/localize';
import * as vscode from 'vscode';
import * as interaction from '../common/file-dialog-interaction';
import * as fileUtils from '../../core/common/utils/file-utils';
import * as stringUtils from '../../core/common/utils/string-utils';
import * as configurationConstants from '../../core/common/constants/workspace-configuration';
import { ReminderError } from '../../core/common/errors/reminder-error';
import { ConverterType } from '../../core/common/enum/converter-type';

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
	workspacePath = await interaction.showDialogSaveWorkspace(
		localize('message.saveWorkspaceFileAs'), 
		configurationConstants.WorkspaceFileExtension);
	if (!workspacePath) {
		throw new ReminderError(localize('message.noWorkspacePathProvided'));
	}

	// Init workspace configuration
	const workspaceConfig = getDefaultConverterWorkspaceConfig(ConverterType.hl7v2ToFhir, templateFolder.fsPath, dataFolder.fsPath);

	// Save the workpace configuration
	fileUtils.writePrettyJson(workspacePath.fsPath, workspaceConfig);

	// Open the workspace
	await vscode.commands.executeCommand('vscode.openFolder', workspacePath, false);
}

function getDefaultConverterWorkspaceConfig(converterType: ConverterType, templateFolder?: string, dataFolder?: string) {
	const folderName = stringUtils.generatePrettyFolderName(templateFolder, localize('common.templateFolder.suffix'));
	const folders: any[] = [];
	const settings = {
		'workbench.editor.enablePreview': false,
		'diffEditor.renderSideBySide': false,
	};
	if (!templateFolder) {
		folders.push({
		});
	} else if (templateFolder) {
		folders.push({
			'name': folderName,
			'path': templateFolder
		});
		settings[`${configurationConstants.ConfigurationSection}.${configurationConstants.TemplateFolderKey}`] = templateFolder;
		settings[`${configurationConstants.ConfigurationSection}.${configurationConstants.ConverterTypeKey}`] = converterType;

		if (dataFolder) {
			folders.push({
				'path': dataFolder
			});
		}
	}
	return {
		'folders': folders,
		'settings': settings
	};
}
