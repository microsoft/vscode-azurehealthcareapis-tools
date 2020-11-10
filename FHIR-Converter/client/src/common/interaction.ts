import * as vscode from 'vscode';
import * as path from 'path';

export async function openDialogSelectFolder(label: string) {
	const selectedFolder = await vscode.window.showOpenDialog({ canSelectMany: false, canSelectFiles: false, canSelectFolders: true, openLabel: label });
	if (!selectedFolder) {
		return undefined;
	} else {
		return selectedFolder[0];
	}
}

export async function showDialogSaveWorkspace(label: string, filter: string) {
	const workspacePath = await vscode.window.showSaveDialog({saveLabel: label, filters: {'workspace': [filter]}});
	if (!workspacePath) {
		return undefined;
	} else {
		return workspacePath;
	}
}

export function askSaveFiles(unsavedTemplates: vscode.TextDocument[], infoMessage: string, acceptButtonLabel: string, rejectButtonLabel: string) {
	return new Promise(resolve => {
		vscode.window.showWarningMessage(infoMessage, acceptButtonLabel, rejectButtonLabel)
		.then(async function (select) {
			if (select === acceptButtonLabel) {
				await saveAllFiles(unsavedTemplates);
			}
			resolve();
		});
	});
}

export function updateEditorContext(resultEditor: vscode.TextEditor, msg: string) {
	resultEditor.edit(editBuilder => {
		const end = new vscode.Position(resultEditor.document.lineCount + 1, 0);
		editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), msg);
	});
}

export function getUnsavedFiles(type: string) {
	const unsavedTemplates: vscode.TextDocument[] = [];
	for (const doc of vscode.workspace.textDocuments) {
		if (doc && doc.isDirty && path.extname(doc.fileName) === type) {
			unsavedTemplates.push(doc);
		}
	}
	return unsavedTemplates;
}

export async function saveAllFiles(unsavedFiles: vscode.TextDocument[]) {
	await Promise.all(unsavedFiles.map(doc => doc.save()));
}
