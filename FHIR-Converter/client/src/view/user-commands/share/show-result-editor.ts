import * as vscode from 'vscode';

export async function showResultEditor(resultFilePath: vscode.Uri, viewColumn = vscode.ViewColumn.Three) {
	await vscode.window.showTextDocument(
	await vscode.workspace.openTextDocument(resultFilePath), {
		viewColumn: viewColumn
	});
}
