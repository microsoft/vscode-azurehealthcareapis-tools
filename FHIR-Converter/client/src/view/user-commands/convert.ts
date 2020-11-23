/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import localize from '../../i18n/localize';
import * as vscode from 'vscode';
import * as configurationConstants from '../../core/common/constants/workspace-configuration';
import * as interaction from '../common/file-dialog/file-dialog-interaction';
import * as engineConstants from '../../core/common/constants/engine';
import * as stateConstants from '../../core/common/constants/workspace-state';
import { globals } from '../../core/globals';
import { showDifferentialView } from '../common/editor/show-differential-view';
import { showResultEditor } from '../common/editor/show-result-editor';
import { ConverterEngineFactory } from '../../core/converter/converter-factory';

export async function convertCommand() {
	// Check whether there is any template not saved and ask if users want to save it
	const unsavedTemplates: vscode.TextDocument[] = interaction.getUnsavedFiles(engineConstants.TemplateFileExt);
	if (unsavedTemplates.length > 0) {
		await interaction.askSaveFiles(unsavedTemplates, localize('message.saveBeforeRefresh'), localize('message.save'), localize('message.ignore'));
	}

	// Get the data file and template file
	const dataFile = globals.settingManager.getWorkspaceState(stateConstants.DataKey);
	
	// create the converter
	const converter = ConverterEngineFactory.getInstance().createConverter();

	// Execute the conversion process
	const resultFile = await converter.convert(dataFile);

	// Open the data in the editor
	await vscode.window.showTextDocument(vscode.Uri.file(dataFile), {
		viewColumn: vscode.ViewColumn.One
	});
	
	// Open the template in the editor
	const templateFile = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
	await vscode.window.showTextDocument(vscode.Uri.file(templateFile), {
		viewColumn: vscode.ViewColumn.Two,
	});
	
	// Obtain the enableDiffView option from the settings.
	const enableDiff = globals.settingManager.getWorkspaceConfiguration(configurationConstants.enableDiffViewKey);
	if (!enableDiff) {
		await showResultEditor(vscode.Uri.file(resultFile));
	} else {
		// Get the history
		const history = converter.getHistory(resultFile);
		if (history.length === 1) {
			// Show result in the editor
			await showResultEditor(vscode.Uri.file(history[0]));
		} else if (history.length > 1) {
			// Show result with the differential view
			await showDifferentialView(vscode.Uri.file(history[1]), vscode.Uri.file(history[0]));
		}
	}
	await vscode.commands.executeCommand('workbench.action.closeOtherEditors');
}
