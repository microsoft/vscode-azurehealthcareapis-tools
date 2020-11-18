/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

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

export function askSaveFiles(unsavedFiles: vscode.TextDocument[], infoMessage: string, acceptButtonLabel: string, rejectButtonLabel: string) {
	return new Promise(resolve => {
		vscode.window.showWarningMessage(infoMessage, acceptButtonLabel, rejectButtonLabel)
		.then(async function (select) {
			if (select === acceptButtonLabel) {
				await saveAllFiles(unsavedFiles);
			}
			resolve();
		});
	});
}

export function getUnsavedFiles(type: string) {
	const unsavedFiles: vscode.TextDocument[] = [];
	for (const doc of vscode.workspace.textDocuments) {
		if (doc && doc.isDirty && path.extname(doc.fileName) === type) {
			unsavedFiles.push(doc);
		}
	}
	return unsavedFiles;
}

export async function saveAllFiles(unsavedFiles: vscode.TextDocument[]) {
	await Promise.all(unsavedFiles.map(doc => doc.save()));
}
