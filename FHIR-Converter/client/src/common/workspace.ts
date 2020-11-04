import * as vscode from 'vscode';
import * as path from 'path';
import { globals } from '../init/globals';
import localize from "../localize";
import { ErrorHandler } from './error-handler';
import { ConverterError } from '../models/converter-error.model';
import { ConverterHandler } from '../converter/converter-handler';
import * as utils from './utils';

export function initWorkspace() {
    if (converterWorkspaceExists()) {
        globals.activeTemplatePath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeTemplatePath');
        globals.activeDataPath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeDataPath');
        globals.coverterEngineHandler = new ConverterHandler();
        vscode.window.setStatusBarMessage(utils.getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
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
            let folderName = utils.generatePrettyFolderName(templateFolder);
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

export function generaterWorkspaceConfig(templateFolder: string, dataFolder: vscode.Uri) {
    let folderName = utils.generatePrettyFolderName(templateFolder);
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

export function getConfiguration(section: string, key: string, errorMessage): string {
    let value: string = vscode.workspace.getConfiguration(section).get(key);
    if(!value){
        vscode.window.showInformationMessage(errorMessage);
        return undefined
    }
    return value;
}

