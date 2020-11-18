import * as vscode from 'vscode';

export function converterWorkspaceExists(ext: string) {
	const workspaceFile = vscode.workspace.workspaceFile;
	if ( workspaceFile !== undefined && workspaceFile.fsPath.endsWith(ext)) {
		return true;
	} else {
		return false;
	}
}
