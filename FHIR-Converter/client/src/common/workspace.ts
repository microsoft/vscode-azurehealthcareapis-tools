import * as vscode from 'vscode';
import * as path from 'path';
import { globals } from '../init/globals';
import localize from '../localize';
import { ConverterHandler } from '../converter/converter-handler';
import * as utils from './utils';
import { ReminderError } from '../errors/reminder-error';
import { ConfigurationError } from '../errors/configuration-error';
import * as workspace from '../common/workspace';

export function initWorkspace() {
	if (converterWorkspaceExists()) {
		globals.activeTemplatePath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeTemplatePath');
		globals.activeDataPath = globals.context.workspaceState.get('microsoft.health.fhir.converter.activeDataPath');
		globals.converterEngineHandler = new ConverterHandler();
		vscode.window.setStatusBarMessage(utils.getStatusBarString(globals.activeDataPath, globals.activeTemplatePath));
		let resultFolder: string = vscode.workspace.getConfiguration('fhirConverter').get('resultFolder');
		if (!resultFolder) {
			resultFolder = globals.context.storagePath;
			if (resultFolder) {
				resultFolder = path.join(resultFolder, 'fhirConverterResult');
				workspace.updateConfiguration('fhirConverter', 'resultFolder', resultFolder);
			} else {
				throw new ReminderError(localize('message.noResultFolderProvided'));
			}
		}
		syncTemplateFolder();
		vscode.workspace.onDidChangeConfiguration(async () => {
			syncTemplateFolder();
		});
	}
}

export function syncTemplateFolder() {
	const templateFolder: string = vscode.workspace.getConfiguration('fhirConverter').get('templateFolder');
	if (templateFolder) {
		const folders = vscode.workspace.workspaceFolders;
		const folderName = utils.generatePrettyFolderName(templateFolder);
		if (!folders) {
			vscode.workspace.updateWorkspaceFolders(0, null, {uri: vscode.Uri.file(templateFolder), name: folderName});
		} else {
			vscode.workspace.updateWorkspaceFolders(0, 1, {uri: vscode.Uri.file(templateFolder), name: folderName});
		}
	} else {
		throw new ConfigurationError(localize('message.noTemplateFolderProvided'));
	}
}

export function converterWorkspaceExists() {
	const workspaceFile = vscode.workspace.workspaceFile;
	if ( workspaceFile !== undefined && workspaceFile.fsPath.endsWith(localize('common.workspaceFileExtension'))) {
		return true;
	} else {
		return false;
	}
}

export function generaterWorkspaceConfig(templateFolder: string, dataFolder: vscode.Uri) {
	const folderName = utils.generatePrettyFolderName(templateFolder);
	return {
		'folders': [
			{
				'name': folderName,
				'path': templateFolder
			},
			{
				'path': dataFolder.fsPath
			}
		],
		'settings': {
			'workbench.editor.enablePreview': false,
			'diffEditor.renderSideBySide': false,
			'fhirConverter.templateFolder': templateFolder
		}
	};
}

export function getConfiguration(section: string, key: string): string {
	const value: string = vscode.workspace.getConfiguration(section).get(key);
	if (!value) {
		return undefined;
	}
	return value;
}

export function updateConfiguration(section: string, key: string, value: string): void {
	try {
		vscode.workspace.getConfiguration(section).update(key, false);
	} catch (error) {
		throw new ConfigurationError(error.message);
	}
}

