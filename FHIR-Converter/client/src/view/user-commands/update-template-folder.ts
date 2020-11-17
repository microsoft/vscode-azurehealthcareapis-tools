import localize from '../../i18n/localize';
import * as vscode from 'vscode';
import * as interaction from '../common/file-dialog-interaction';
import * as configurationConstants from '../../core/common/constants/workspace-configuration';
import { globals } from '../../core/globals';
import { ReminderError } from '../../core/common/errors/reminder-error';
import { converterWorkspaceExists } from './share/converter-workspace-exists';

export async function updateTemplateFolderCommand() {
	// Check if the workspace exists
	if (!converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
		throw new ReminderError(localize('message.needCreateWorkspace'));
	}

	// Select a root template folder
	const templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		throw new ReminderError(localize('message.noTemplateFolderProvided'));
	}

	// Update the configuration
	await globals.settingManager.updateWorkspaceConfiguration(configurationConstants.TemplateFolderKey, templateFolder.fsPath);
}
