import * as vscode from 'vscode';
import { globals } from '../init/globals';
import * as interaction from '../common/view/common-interaction-api';
import * as constants from '../common/constants';
import localize from '../localize';
import { ReminderError } from '../common/errors/reminder-error';

export async function updateTemplateFolderCommand() {
	const templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		throw new ReminderError(localize('message.noTemplateFolderProvided'));
	}
	await globals.settingManager.updateConfiguration(constants.ConfigurationTemplateFolderKey, templateFolder.fsPath);
}
