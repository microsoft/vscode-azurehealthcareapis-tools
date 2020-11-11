import * as vscode from 'vscode';
import { globals } from '../init/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as fileUtils from '../common/utils/file-utils';
import * as stringUtils from '../common/utils/string-utils';
import { convert } from './command-helper/convert';
import { showDifferentialView } from './command-helper/show-differential-view';
import * as constants from '../common/constants';


export async function convertAndDiffCommand() {
	// convert 
	const msg = await convert();
	
	const resultFolder = globals.settingManager.getConfiguration(constants.ConfigurationResultFolderKey);
	const resultFile = path.join(resultFolder, stringUtils.getResultFileName(globals.settingManager.activeDataPath, globals.settingManager.activeTemplatePath));
	
	if (!fs.existsSync(resultFile)) {
		// save result to file and show result
		fileUtils.checkFolderWritePrettyJson(resultFile, msg.FhirResource);
		await vscode.window.showTextDocument(
			await vscode.workspace.openTextDocument(resultFile), {
			viewColumn: vscode.ViewColumn.Three
		});
	} else {
		// show result and show differential view
		await showDifferentialView(resultFile, msg.FhirResource);
	}
	
}






