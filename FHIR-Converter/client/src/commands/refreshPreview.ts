import * as vscode from 'vscode';
import * as interaction from '../common/interaction';
import { fhirConversion } from './fhirConversion';
import { globals } from '../init/globals';
import localize from '../localize';

export async function refreshPreviewCommand() {
	const unsavedTemplates: vscode.TextDocument[] = interaction.getUnsavedTemplates('.liquid');
	if (unsavedTemplates.length > 0) {
		interaction.askSaveTemplates(unsavedTemplates, localize('message.saveBeforeRefresh'), localize('message.save'), localize('message.ignore'));
	} else {
		await fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
	}
}


