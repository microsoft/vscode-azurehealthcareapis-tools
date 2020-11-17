import localize from '../../i18n/localize';
import * as vscode from 'vscode';
import * as configurationConstants from '../../core/common/constants/workspace-configuration';
import * as interaction from '../common/file-dialog-interaction';
import * as engineConstants from '../../core/common/constants/engine';
import * as stateConstants from '../../core/common/constants/workspace-state';
import { globals } from '../../core/globals';
import { showDifferentialView } from './share/show-differential-view';
import { converterWorkspaceExists } from './share/converter-workspace-exists';
import { ReminderError } from '../../core/common/errors/reminder-error';
import { ConversionError } from '../../core/common/errors/conversion-error';
import { showResultEditor } from './share/show-result-editor';
import { ConverterEngineFactory } from '../../core/converter/converter-factory';

export async function convertAndDiffCommand() {
	// Check if the workspace exists
	if (!converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
		throw new ReminderError(localize('message.needCreateWorkspace'));
	}

	// Check whether there is any template not saved and ask if users want to save it
	const unsavedTemplates: vscode.TextDocument[] = interaction.getUnsavedFiles(engineConstants.TemplateFileExt);
	if (unsavedTemplates.length > 0) {
		await interaction.askSaveFiles(unsavedTemplates, localize('message.saveBeforeRefresh'), localize('message.save'), localize('message.ignore'));
	}

	// Get the data file and template file
	const dataFile = globals.settingManager.getWorkspaceState(stateConstants.DataKey);

	// Check that data file is available 
	if (!dataFile) {
		throw new ReminderError(localize('message.needSelectData'));
	}
	
	// create the converter
	const converter = ConverterEngineFactory.getInstance().createConverter();

	// Execute the conversion process
	const resultFile = converter.convert(dataFile);

	if (!resultFile) {
		throw new ConversionError(localize('message.noResponseFromEngine'));
	}

	// Open the data and template in the editor
	await vscode.window.showTextDocument(vscode.Uri.file(dataFile), {
		viewColumn: vscode.ViewColumn.One
	});
	
	const templateFile = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
	await vscode.window.showTextDocument(vscode.Uri.file(templateFile), {
		viewColumn: vscode.ViewColumn.Two,
	});
	
	const history = converter.getHistory(resultFile);
	if (history.length === 1) {
		// Show result in the editor
		await showResultEditor(vscode.Uri.file(history[0]));
	} else if (history.length > 1) {
		// Show result with the differential view
		await showDifferentialView(vscode.Uri.file(history[1]), vscode.Uri.file(history[0]));
	}
}






