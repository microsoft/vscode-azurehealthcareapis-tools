import * as vscode from 'vscode';
import * as path from 'path';
import localize from '../localize';
import * as utils from '../common/utils/string-utils';
import { ConfigurationError } from '../common/errors/configuration-error';
import * as constants from '../common/constants';
import { DataType } from '../core/enum/data-type';
import { FileType } from '../core/enum/file-type';

export class SettingManager {
	workspaceSection: string;
	activeTemplatePath: string;
	activeDataPath: string;
	context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext, workspaceSection: string) {
		this.workspaceSection = workspaceSection;
		this.context = context;
	}

	generaterWorkspaceConfig(templateFolder?: string, dataFolder?: string) {
		const folderName = utils.generatePrettyFolderName(templateFolder);
		const folders: any[] = [];
		const settings = {
			'workbench.editor.enablePreview': false,
			'diffEditor.renderSideBySide': false,
		};
		if (!templateFolder) {
			folders.push({
			});
		} else if (templateFolder) {
			folders.push({
				'name': folderName,
				'path': templateFolder
			});
			settings[`${this.workspaceSection}.${constants.ConfigurationTemplateFolderKey}`] = templateFolder;

			if (dataFolder) {
				folders.push({
					'path': dataFolder
				});
			}
		}
		return {
			'folders': folders,
			'settings': settings
		};
	}
	
	getConfiguration(key: string) {
		const value: string = vscode.workspace.getConfiguration(this.workspaceSection).get(key);
		if (!value) {
			return undefined;
		}
		return value;
	}
	
	updateConfiguration(key: string, value: string) {
		try {
			return new Promise(resolve => {
				vscode.workspace.getConfiguration(this.workspaceSection).update(key, value, false)
				.then(() => {
					resolve();
				});
			});
			
		} catch (error) {
			throw new ConfigurationError(error.message);
		}
	}


	syncTemplateFolder() {
		const templateFolder: string = this.getConfiguration(constants.ConfigurationTemplateFolderKey);
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

	converterWorkspaceExists() {
		const workspaceFile = vscode.workspace.workspaceFile;
		if ( workspaceFile !== undefined && workspaceFile.fsPath.endsWith(localize('common.workspaceFileExtension'))) {
			return true;
		} else {
			return false;
		}
	}

	getWorkspaceType() {
		// To do: we will get the data type from configuration later
		// return getConfiguration(constants.dataType);
		return DataType.hl7v2;
	}

	updateActiveFile(file: string, type: FileType) {
		if (type === FileType.data) {
			this.activeDataPath = file;
			this.context.workspaceState.update(constants.WorkspaceStateDataKey, this.activeDataPath);
		} else if (type === FileType.template) {
			this.activeTemplatePath = file;
			this.context.workspaceState.update(constants.WorkspaceStateTemplateKey, this.activeTemplatePath);
		}
		vscode.window.setStatusBarMessage(utils.getStatusBarString(this.activeDataPath, this.activeTemplatePath));
		
	}

	async initWorkspace() {
		if (this.converterWorkspaceExists()) {
			this.activeTemplatePath = this.context.workspaceState.get(constants.WorkspaceStateTemplateKey);
			this.activeDataPath = this.context.workspaceState.get(constants.WorkspaceStateDataKey);
			vscode.window.setStatusBarMessage(utils.getStatusBarString(this.activeDataPath, this.activeTemplatePath));
			let resultFolder: string = this.getConfiguration(constants.ConfigurationResultFolderKey);
			if (!resultFolder) {
				resultFolder = this.context.storagePath;
				resultFolder = path.join(resultFolder, constants.DefaultResultFolderName);
				await this.updateConfiguration(constants.ConfigurationResultFolderKey, resultFolder);
			}
			this.syncTemplateFolder();
			vscode.workspace.onDidChangeConfiguration(async () => {
				this.syncTemplateFolder();
			});
		}
	}
	
}
