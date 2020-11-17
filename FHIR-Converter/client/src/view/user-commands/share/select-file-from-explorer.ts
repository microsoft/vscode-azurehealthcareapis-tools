import localize from '../../../i18n/localize';
import * as stateConstants from '../../../core/common/constants/workspace-state';
import * as configurationConstants from '../../../core/common/constants/workspace-configuration';
import { FileType } from '../../../core/common/enum/file-type';
import { convertAndDiffCommand } from '../convert';
import { ConversionError } from '../../../core/common/errors/conversion-error';
import { setStatusBar } from './set-status-bar';
import { globals } from '../../../core/globals';
import { ReminderError } from '../../../core/common/errors/reminder-error';
import { converterWorkspaceExists } from './converter-workspace-exists';

export async function selectFileFromExplorer(event: any, type: FileType) {
	// Check if the workspace exists
	if (!converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
		throw new ReminderError(localize('message.needCreateWorkspace'));
	}

	if (event && event.fsPath) {
		// Update the active files
		if (type === FileType.Data) {
			await globals.settingManager.updateWorkspaceState(stateConstants.DataKey, event.fsPath);
		} else if (type === FileType.Template) {
			await globals.settingManager.updateWorkspaceState(stateConstants.TemplateKey, event.fsPath);
		}
		
		// Set status bar
		setStatusBar();

		// Execute the conversion process and show the differential view
		await convertAndDiffCommand();
		
	} else {
		throw new ConversionError(localize('message.failSelectFile'));
	}
}


