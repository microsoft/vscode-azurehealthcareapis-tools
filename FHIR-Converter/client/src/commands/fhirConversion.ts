import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from '../common/utils';
import * as workspace from '../common/workspace';
import * as interaction from '../common/interaction';
import localize from '../localize';
import { globals } from '../init/globals';
import { DataType } from '../models/data-type';
import { ConversionError } from '../errors/conversion-error';
import { ReminderError } from '../errors/reminder-error';

export async function fhirConversion(activeDataPath: string, activeTemplatePath: string) {
	if (!activeDataPath) {
		throw new ReminderError(localize('message.needSelectData'));
	}
	if (!activeTemplatePath) {
		throw new ReminderError(localize('message.needSelectTemplate'));
	}

	await openShowFile(activeDataPath, activeTemplatePath);

	const resultFolder: string = workspace.getConfiguration('fhirConverter', 'resultFolder', );
	if (!resultFolder) {
		throw new ConversionError(localize('message.noResultFolderProvided'));
	}

	const templateFolder: string = workspace.getConfiguration('fhirConverter', 'templateFolder');
	if (!templateFolder) {
		throw new ConversionError(localize('message.noTemplateFolderProvided'));
	}

	await convertSaveFileShowDifferentialView(activeDataPath, activeTemplatePath, resultFolder, templateFolder);
}

async function convertSaveFileShowDifferentialView(activeDataPath: string, activeTemplatePath: string, resultFolder: string, templateFolder: string) {
	// save result
	const dataName = path.basename(activeDataPath);
	const templateName = path.basename(activeTemplatePath);
	const resultFileName = path.join(resultFolder, utils.getResultFileName(dataName, templateName));

	const dataDoc = await getDocText(activeDataPath);

	const msg = globals.converterEngineHandler.getEngine(DataType.hl7v2).convert(dataDoc, utils.getTemplateNameWithoutExt(templateName), templateFolder, resultFolder); // get the data type from configuration later
	
	if (!utils.checkEngineStatus(msg)) {
		throw new ConversionError(msg.ErrorMessage);
	}

	const exists = fs.existsSync(resultFileName);
	if (!exists) {
		utils.checkFolderWritePrettyJson(resultFileName, msg.FhirResource);
	}

	// show result
	const resultEditor = await showResultEditor(resultFileName);

	// show differential view
	if (exists) {
		showDifferentView(resultEditor, msg);
	}
}

async function getDocText(activeDataPath: string) {
	return (await vscode.workspace.openTextDocument(activeDataPath)).getText();
}

async function openShowFile(activeDataPath: string, activeTemplatePath: string) {
	await vscode.window.showTextDocument(vscode.Uri.file(activeDataPath), {
		viewColumn: vscode.ViewColumn.One
	});

	await vscode.window.showTextDocument(vscode.Uri.file(activeTemplatePath), {
		viewColumn: vscode.ViewColumn.Two,
	});
}

async function showResultEditor(resultFileName) {
	return vscode.window.showTextDocument(
		await vscode.workspace.openTextDocument(resultFileName), {
		viewColumn: vscode.ViewColumn.Three
	});
} 

function showDifferentView(resultEditor: vscode.TextEditor, msg: any) {
	interaction.updateEditorContext(resultEditor, utils.convertPrettyJsonString(msg.FhirResource));
	vscode.commands.executeCommand('workbench.files.action.compareWithSaved');
}
