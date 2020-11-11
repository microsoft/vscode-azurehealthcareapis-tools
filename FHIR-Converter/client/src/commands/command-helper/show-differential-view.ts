import * as vscode from 'vscode';
import * as interaction from '../../common/view/common-interaction-api';
import * as fs from 'fs';
import { ConversionError } from '../../common/errors/conversion-error';
import localize from '../../localize';
import * as utils from '../../common/utils/string-utils';

export async function showDifferentialView(resultFile: string, msg: object) {
	// Check for the last result
	if (!fs.existsSync(resultFile)) {
		throw new ConversionError(localize('message.noResultBefore'));
	}

	// Show result in the editor
	const resultEditor = await vscode.window.showTextDocument(
		await vscode.workspace.openTextDocument(resultFile), {
		viewColumn: vscode.ViewColumn.Three
	});

	// Show result with the differential view
	interaction.updateEditorContext(resultEditor, utils.convertPrettyJsonString(msg));
	vscode.commands.executeCommand('workbench.files.action.compareWithSaved');
}
