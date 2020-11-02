import * as vscode from 'vscode';
import { getUnsavedTemplates, askSaveTemplates } from '../common/utils';
import { fhirConversion } from '../common/conversion';
import { globals } from '../init/globals';
import localize from "../localize";

export async function refreshPreviewCommand() {
	try{
		let unsavedTemplates: vscode.TextDocument[] = getUnsavedTemplates('.liquid');
		if (unsavedTemplates.length > 0){
			askSaveTemplates(unsavedTemplates, localize("messsage.saveBeforeRefresh"), localize("messsage.save"), localize("messsage.ignore"));
		}
		else{
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		}
	}
	catch(error){
		vscode.window.showErrorMessage(localize("error.refreshPreview.prefix") + error.message);
	}
}


