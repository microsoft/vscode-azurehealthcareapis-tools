import * as vscode from 'vscode';
import * as interaction from '../common/interaction';
import { conversionProcess } from '../common/conversion-process';
import { globals } from '../init/globals';
import localize from "../localize";
import { ConverterError } from '../models/converter-error.model';
import { ErrorHandler } from '../common/error-handler';

export async function refreshPreviewCommand() {
	try{
		const unsavedTemplates: vscode.TextDocument[] = interaction.getUnsavedTemplates('.liquid');
		if (unsavedTemplates.length > 0){
			interaction.askSaveTemplates(unsavedTemplates, localize("messsage.saveBeforeRefresh"), localize("messsage.save"), localize("messsage.ignore"));
		}else{
			await conversionProcess(globals.activeDataPath, globals.activeTemplatePath);
		}
	}catch(error){
		new ErrorHandler(ConverterError.refreshPreviewError, error).handle();
	}
}


