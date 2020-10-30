import * as vscode from 'vscode';
import { getUnsavedTemplates, askSaveTemplates } from '../common/utils';
import { fhirConversion } from '../common/conversion';
import { globals } from '../init/globals';
import { LABELS } from '../common/constants';

export async function refreshPreviewCommand() {
	try{
		let unsavedTemplates: vscode.TextDocument[] = getUnsavedTemplates('.liquid');
		if (unsavedTemplates.length > 0){
			askSaveTemplates(unsavedTemplates, LABELS["messsage.saveBeforeRefresh"], LABELS["messsage.save"], LABELS["messsage.ignore"]);
		}
		else{
			fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		}
	}
	catch(error){
		vscode.window.showErrorMessage(LABELS["error.refreshPreview.prefix"] + error.message);
	}
}


