import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as cp from 'child_process';
import { globals } from '../init/globals';
import { fhirConversion } from './conversion';
import { Status } from './status';
import localize from "../localize";
import { ConverterError } from '../common/error';
import { ErrorHandler } from '../common/error-handler';

export function initWorkspace() {
    if (converterWorkspaceExists()) {
        globals.activeTemplatePath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeTemplatePath');
        globals.activeDataPath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeDataPath');
        vscode.window.setStatusBarMessage(getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
        let resultFolder: string = vscode.workspace.getConfiguration('fhirConverter').get('resultFolder');
        if (!resultFolder) {
            resultFolder = globals.context.storagePath;
            if (resultFolder) {
                resultFolder = path.join(resultFolder, 'fhirConverterResult');
                vscode.workspace.getConfiguration('fhirConverter').update('resultFolder', resultFolder, false);
            } else {
                vscode.window.showInformationMessage(localize("messsage.noResultFolderProvided"));
            }
        }
        syncTemplateFolder();
        vscode.workspace.onDidChangeConfiguration(async () => {
            syncTemplateFolder();
        });
    }
}

export function syncTemplateFolder() {
    try{
        let templateFolder: string = vscode.workspace.getConfiguration('fhirConverter').get('templateFolder');
        if (templateFolder) {
            let folders = vscode.workspace.workspaceFolders;
            let folderName = generatePrettyFolderName(templateFolder);
            if(!folders){
                vscode.workspace.updateWorkspaceFolders(0, null, {uri: vscode.Uri.file(templateFolder), name: folderName});
            }
            else{
                vscode.workspace.updateWorkspaceFolders(0, 1, {uri: vscode.Uri.file(templateFolder), name: folderName});
            }
        }
        else{
            vscode.window.showInformationMessage(localize("messsage.noTemplateFolderProvided"));
        }
    }
    catch(error){
        new ErrorHandler(ConverterError.updateConfiguration, error).handle();
    }
}

export function createFolders(resultFolder: string) {
    if (!fs.existsSync(resultFolder))
        fs.mkdirSync(resultFolder, { recursive: true });
}

export function updateEditorContext(resultEditor: vscode.TextEditor, msg: string) {
    resultEditor.edit(editBuilder => {
        const end = new vscode.Position(resultEditor.document.lineCount + 1, 0);
        editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), msg);
    });
}

export function checkEngineStatus(msg: any) {
    return msg.Status === Status.OK;
}

export function getTemplateNameWithoutExt(templateName: string): string {
    return templateName.substring(0, templateName.lastIndexOf('.'));
}

export function getConfiguration(section: string, key: string, errorMessage): string {
    let value: string = vscode.workspace.getConfiguration(section).get(key);
    if(!value){
        vscode.window.showInformationMessage(errorMessage);
        return undefined
    }
    return value;
}

export function converterWorkspaceExists(){
    let workspaceFile = vscode.workspace.workspaceFile;
    if( workspaceFile !== undefined && workspaceFile.fsPath.endsWith(localize("common.workspaceFileExtension"))){
        return true;
    }
    else{
        vscode.window.showInformationMessage(localize("messsage.needCreateWorkspace"));
        return false;
    }
}

export async function convert(dataContext: string, entryTemplate: string, templateFolder: string, resultFolder: string) {
    let exePath = path.join(__dirname, "../../engine/Microsoft.Health.Fhir.Converter.Tool.exe");
    let resultFile = path.join(resultFolder, 'temp.json');
    cp.execFileSync(exePath, ['-d', templateFolder, '-n',  entryTemplate, '-c', dataContext, '-f', resultFile]);
    let returnMsg = JSON.parse(fs.readFileSync(resultFile).toString());
    return returnMsg;
}

export async function openDialogSelectFolder(label: string, errorMessage: string) {
    let selectedFolder = await vscode.window.showOpenDialog({ canSelectMany: false, canSelectFiles: false, canSelectFolders: true, openLabel: label });
    if(!selectedFolder){
        vscode.window.showInformationMessage(errorMessage);
        return undefined;
    }
    else{
        return selectedFolder[0];
    }
}

export function generaterWorkspaceConfig(templateFolder: string, dataFolder: vscode.Uri) {
    let folderName = generatePrettyFolderName(templateFolder);
	return {
		"folders": [
			{
				"name": folderName,
				"path": templateFolder
			},
			{
				"path": dataFolder.fsPath
			}
		],
		"settings": {
			"workbench.editor.enablePreview": false,
			"diffEditor.renderSideBySide": false,
			"fhirConverter.templateFolder": templateFolder
		}
	};
}

export function generatePrettyFolderName(templateFolder: string) {
    return path.basename(templateFolder) + ' ' + localize("common.templateFolder.suffix");
}

export async function showDialogSaveWorkspace(label: string, errorMessage: string, filter: string){
	let workspacePath = await vscode.window.showSaveDialog({saveLabel: label, filters: {'workspace':[filter]}});
	if(!workspacePath){
        vscode.window.showInformationMessage(errorMessage);
        return undefined;
    }
    else{
        return workspacePath;
    }
}

export function wirtePrettyJson(filePath: string, json: object){
	fs.writeFileSync(filePath, convertPrettyJsonString(json));
}

export function convertPrettyJsonString(json: object){
    return JSON.stringify(json, null, 4)
}

export function getUnsavedTemplates(type: string) {
	let unsavedTemplates: vscode.TextDocument[] = [];
	for (let doc of vscode.workspace.textDocuments) {
		if (doc && doc.isDirty && path.extname(doc.fileName) === type) {
			unsavedTemplates.push(doc);
		}
	}
	return unsavedTemplates;
}

export function saveAllFiles(unsavedFiles: vscode.TextDocument[]) {
	for (let doc of unsavedFiles) {
		doc.save();
	}
}

export function askSaveTemplates(unsavedTemplates: vscode.TextDocument[], infoMessage: string, acceptButtonLabel: string, rejectButtonLabel: string) {
	vscode.window.showWarningMessage(infoMessage, acceptButtonLabel, rejectButtonLabel)
		.then(function (select) {
			if (select === acceptButtonLabel) {
				saveAllFiles(unsavedTemplates);
			}
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		});
}

export function getStatusBarString(activeDataPath: string | undefined, activeTemplatePath: string | undefined){
    let dataName = 'none';
    let templateName = 'none';
    if(activeDataPath){
        dataName = path.basename(activeDataPath);
    }
    if(activeTemplatePath){
        templateName = path.basename(activeTemplatePath);
    }
    let str = `${localize("microsoft.health.fhir.converter.configuration.title")}: ${localize("common.data")} - ${dataName}, ${localize("common.template")} - ${templateName}`
    return str;
}
