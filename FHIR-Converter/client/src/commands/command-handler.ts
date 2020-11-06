import { createConverterWorkspaceCommand } from './createConverterWorkspace';
import { refreshPreviewCommand } from  './refreshPreview';
import { updateTemplateFolderCommand } from  './updateTemplateFolder';
import { selectTemplateCommand } from  './selectTemplate';
import { selectDataCommand } from  './selectData';
import { CommandID }  from '../models/command-id';
import { ReminderError } from '../errors/reminder-error';
import localize from '../localize';
import * as errorHandler from '../errors/error-handler';
import * as workspace from '../common/workspace';

export async function commandHandler(event) {
	try {
		if (this === CommandID.createConverterWorkspaceCommand) {
			await createConverterWorkspaceCommand();
		} else if (!workspace.converterWorkspaceExists()) {
			throw new ReminderError(localize('message.needCreateWorkspace'));
		} else if (this === CommandID.refreshPreviewCommand) {
			await refreshPreviewCommand();
		} else if (this === CommandID.updateTemplateFolderCommand) {
			await updateTemplateFolderCommand();
		} else if (this === CommandID.selectTemplateCommand) {
			await selectTemplateCommand(event);
		} else if (this === CommandID.selectDataCommand) {
			await selectDataCommand(event);
		}
		
	} catch (error) {
		errorHandler.handle(error);
	}
}
