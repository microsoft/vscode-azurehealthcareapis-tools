import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as fileUtils from '../common/utils/file-utils';
import * as stringUtils from '../common/utils/string-utils';
import * as constants from '../common/constants';
import { globals } from '../init/globals';
import { convert } from './command-helper/convert';
import { showDifferentialView } from './command-helper/show-differential-view';

export async function convertAndDiffCommand() {
	// Obtain the converted result
	const msg = await convert();
	
	// Get the name of result file 
	const resultFolder = globals.settingManager.getConfiguration(constants.ConfigurationResultFolderKey);
	const resultFile = path.join(resultFolder, stringUtils.getResultFileName(globals.settingManager.activeDataPath, globals.settingManager.activeTemplatePath));
	
	if (!fs.existsSync(resultFile)) {
		// Save result to file
		fileUtils.checkFolderWritePrettyJson(resultFile, msg.FhirResource);

		// Show result in the editor
		await vscode.window.showTextDocument(
			await vscode.workspace.openTextDocument(resultFile), {
			viewColumn: vscode.ViewColumn.Three
		});
	} else {
		// Show result with the differential view
		await showDifferentialView(resultFile, msg.FhirResource);
	}
	
}






