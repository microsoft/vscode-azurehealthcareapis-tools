import * as vscode from 'vscode';
import * as path from 'path';
import { globals } from '../init/globals';
import localize from "../localize";
import { getStatusBarString } from './utils';
import { FileType } from '../models/file-type.model';
import { conversionProcess } from '../common/conversion-process';

export async function openDialogSelectFolder(label: string, errorMessage: string) {
	const selectedFolder = await vscode.window.showOpenDialog({ canSelectMany: false, canSelectFiles: false, canSelectFolders: true, openLabel: label });
	if (!selectedFolder) {
		vscode.window.showInformationMessage(errorMessage);
		return undefined;
	} else {
		return selectedFolder[0];
	}
}

export async function showDialogSaveWorkspace(label: string, errorMessage: string, filter: string) {
	const workspacePath = await vscode.window.showSaveDialog({saveLabel: label, filters: {'workspace': [filter]}});
	if (!workspacePath) {
		vscode.window.showInformationMessage(errorMessage);
		return undefined;
	} else {
		return workspacePath;
	}
}

export async function selectFileFromExplorer(event: any, type: FileType) {
	if (event && event.fsPath) {
		updateActiveFile(event.fsPath, type);
		await conversionProcess(globals.activeDataPath, globals.activeTemplatePath);
	} else {
		vscode.window.showErrorMessage(localize("messsage.failSelectData"));
	}
}

export function askSaveTemplates(unsavedTemplates: vscode.TextDocument[], infoMessage: string, acceptButtonLabel: string, rejectButtonLabel: string) {
	vscode.window.showWarningMessage(infoMessage, acceptButtonLabel, rejectButtonLabel)
		.then(async function (select) {
			if (select === acceptButtonLabel) {
				saveAllFiles(unsavedTemplates);
			}
			await conversionProcess(globals.activeDataPath, globals.activeTemplatePath);
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

export function saveAllFiles(unsavedFiles: vscode.TextDocument[]) {
	for (const doc of unsavedFiles) {
		doc.save();
	}
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
