import * as vscode from 'vscode';
import * as workspace from '../common/workspace';
import * as interaction from '../common/interaction';
import localize from '../localize';
import { ReminderError } from '../errors/reminder-error';

export async function updateTemplateFolderCommand() {
	const templateFolder: vscode.Uri = await interaction.openDialogSelectFolder(localize('message.selectRootTemplateFolder'));
	if (!templateFolder) {
		throw new ReminderError(localize('message.noTemplateFolderProvided'));
	}
	workspace.updateConfiguration('fhirConverter', 'templateFolder', templateFolder.fsPath);
}
