import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from './utils';
import * as workspace from './workspace';
import * as interaction from './interaction';
import localize from "../localize";
import { globals } from '../init/globals';
import { DataType } from '../models/data-type.model';

export async function conversionProcess(activeDataPath: string, activeTemplatePath: string) {
	try{
		if(!workspace.converterWorkspaceExists()){
			return undefined;
		}
		
		if(!activeDataPath){
			vscode.window.showInformationMessage(localize("messsage.needSelectData"));
			return undefined;
		}
		if(!activeTemplatePath){
			vscode.window.showInformationMessage(localize("messsage.needSelectTemplate"));
			return undefined;
		}

		await openShowFile(activeDataPath, activeTemplatePath);

		const resultFolder: string = workspace.getConfiguration('fhirConverter', 'resultFolder', localize("messsage.noResultFolderProvided"));
		if(!resultFolder){
			return undefined;
		}

		const templateFolder: string = workspace.getConfiguration('fhirConverter', 'templateFolder', localize("messsage.noTemplateFolderProvided"));
		if(!templateFolder){
			return undefined;
		}

		await convertSaveFileShowDifferentialView(activeDataPath, activeTemplatePath, resultFolder, templateFolder);
	}catch(err){
		vscode.window.showErrorMessage(localize("error.conversion.prefix") + err.message);
	}
}

async function convertSaveFileShowDifferentialView(activeDataPath: string, activeTemplatePath: string, resultFolder: string, templateFolder: string) {
	// save result
	const dataName = path.basename(activeDataPath);
	const templateName = path.basename(activeTemplatePath);
	const resultFileName = path.join(resultFolder, utils.getResultFileName(dataName, templateName));

	const dataDoc = await getDocText(activeDataPath);

	const msg = globals.coverterEngineHandler.getEngine(DataType.hl7v2).convert(dataDoc, utils.getTemplateNameWithoutExt(templateName), templateFolder, resultFolder); // get the data type from configuration later
	
	if(!utils.checkEngineStatus(msg)){
		throw new Error(msg.ErrorMessage);
	}

	const exists = fs.existsSync(resultFileName);
	if (!exists) {
		utils.checkFolderWirtePrettyJson(resultFileName, msg.FhirResource);
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

async function showResultEditor(resultFileName){
	return vscode.window.showTextDocument(
		await vscode.workspace.openTextDocument(resultFileName), {
		viewColumn: vscode.ViewColumn.Three
	});
} 

function showDifferentView(resultEditor: vscode.TextEditor, msg: any) {
	interaction.updateEditorContext(resultEditor, utils.convertPrettyJsonString(msg.FhirResource));
	vscode.commands.executeCommand('workbench.files.action.compareWithSaved');
}
