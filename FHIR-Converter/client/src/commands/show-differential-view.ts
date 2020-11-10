import * as vscode from 'vscode';
import * as interaction from '../common/view/common-interaction-api';
import * as fs from 'fs';
import { ConversionError } from '../common/errors/conversion-error';
import localize from '../localize';
import * as utils from '../common/utils/string-utils';

export async function showDifferentialView(resultFile: string, msg: object) {
	// check file exist
	if (!fs.existsSync(resultFile)) {
		throw new ConversionError(localize('message.noResultBefore'));
	}

	// show result
	const resultEditor = await vscode.window.showTextDocument(
		await vscode.workspace.openTextDocument(resultFile), {
		viewColumn: vscode.ViewColumn.Three
	});

	// diff
	interaction.updateEditorContext(resultEditor, utils.convertPrettyJsonString(msg));
	vscode.commands.executeCommand('workbench.files.action.compareWithSaved');
}
