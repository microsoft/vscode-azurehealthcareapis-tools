import * as vscode from 'vscode';
import * as path from 'path';
import { globals } from '../init/globals';
import { getStatusBarString } from './utils';
import { FileType } from '../models/file-type';
import { fhirConversion } from '../commands/fhirConversion';

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

export function askSaveTemplates(unsavedTemplates: vscode.TextDocument[], infoMessage: string, acceptButtonLabel: string, rejectButtonLabel: string) {
	vscode.window.showWarningMessage(infoMessage, acceptButtonLabel, rejectButtonLabel)
		.then(async function (select) {
			if (select === acceptButtonLabel) {
				await saveAllFiles(unsavedTemplates);
			}
			await fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
		});
}

export function updateEditorContext(resultEditor: vscode.TextEditor, msg: string) {
	resultEditor.edit(editBuilder => {
		const end = new vscode.Position(resultEditor.document.lineCount + 1, 0);
		editBuilder.replace(new vscode.Range(new vscode.Position(0, 0), end), msg);
	});
}

export function getUnsavedTemplates(type: string) {
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

export function updateActiveFile(file: string, type: FileType) {
	if (type === FileType.data) {
		globals.activeDataPath = file;
		globals.context.workspaceState.update('microsoft.health.fhir.converter.activeDataPath', globals.activeDataPath);
	} else if (type === FileType.template) {
		globals.activeTemplatePath = file;
		globals.context.workspaceState.update('microsoft.health.fhir.converter.activeTemplatePath', globals.activeTemplatePath);
	}
	vscode.window.setStatusBarMessage(getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
}
