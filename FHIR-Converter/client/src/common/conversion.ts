import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as utils from '../common/utils'
import { LABELS } from '../common/constants';

export async function fhirConversion(activeDataPath: string, activeTemplatePath: string) {
    try{
        if(!utils.converterWorkspaceExists()){
            return undefined;
        }
        
        if(!activeDataPath){
            vscode.window.showInformationMessage(LABELS["messsage.needSelectData"]);
            return undefined;
        }
        if(!activeTemplatePath){
            vscode.window.showInformationMessage(LABELS["messsage.needSelectTemplate"]);
            return undefined;
        }

        await vscode.window.showTextDocument(vscode.Uri.file(activeDataPath), {
            viewColumn: vscode.ViewColumn.One,
            preview: true
        });
        
        await vscode.window.showTextDocument(vscode.Uri.file(activeTemplatePath), {
            viewColumn: vscode.ViewColumn.Two,
        });

        // save result
        let resultFolder:string = utils.getConfiguration('fhirConverter', 'resultFolder', LABELS["messsage.noResultFolderProvided"]);
        if(!resultFolder){
            return undefined;
        }

        const dataName = path.basename(activeDataPath);
        const templateName = path.basename(activeTemplatePath);
        let dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
        let templateFolder: string = utils.getConfiguration('fhirConverter', 'templateFolder', LABELS["messsage.noTemplateFolderProvided"]);
        if(!templateFolder){
            return undefined;
        }
        
        let msg = await utils.convert(dataDoc, utils.getTemplateNameWithoutExt(templateName), templateFolder, resultFolder)

        if(!utils.checkEngineStatus(msg)){
            throw new Error(msg.ErrorMessage);
        }

        const resultFileName = path.join(resultFolder ,dataName + ' - ' + templateName + '.json');
        let exists = fs.existsSync(resultFileName);
        if(!exists){
            utils.createFolders(resultFolder);
            utils.wirtePrettyJson(resultFileName, msg);
        }

        // show result
        let resultEditor = await vscode.window.showTextDocument(
            await vscode.workspace.openTextDocument(resultFileName), {
            viewColumn: vscode.ViewColumn.Three,
            preview: true
        });

        // show differential view
        if(exists){
            utils.updateEditorContext(resultEditor, utils.convertPrettyJsonString(msg.FhirResource));
            vscode.commands.executeCommand('workbench.files.action.compareWithSaved');
        }
    }
    catch(err){
        vscode.window.showErrorMessage(LABELS["error.conversion.prefix"] + err.message);
    }
}