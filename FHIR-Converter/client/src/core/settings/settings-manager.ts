/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import * as fileUtils from '../common/utils/file-utils';

export class SettingManager {
	_context: vscode.ExtensionContext;
	_workspaceSection: string;

	constructor(context: vscode.ExtensionContext, workspaceSection: string) {
		this._workspaceSection = workspaceSection;
		this._context = context;
	}

	public get context() {
		return this._context;
	}

	public set context(context: vscode.ExtensionContext) {
		this._context = context;
	}
	
	public get workspaceSection() {
		return this._workspaceSection;
	}

	public set workspaceSection(workspaceSection: string) {
		this._workspaceSection = workspaceSection;
	}

	initWorkspaceConfiguration(workspacePath: string) {
		const workspaceConfig = {
			'folders': [],
			'settings': {}
		};
		fileUtils.writePrettyJson(workspacePath, workspaceConfig);
		return workspaceConfig;
	}

	
	getWorkspaceConfiguration(key: string) {
		const value: string = vscode.workspace.getConfiguration(this.workspaceSection).get(key);
		if (!value) {
			return undefined;
		}
		return value;
	}
	
	updateWorkspaceConfiguration(key: string, value: string) {
		return new Promise(resolve => {
			vscode.workspace.getConfiguration(this.workspaceSection).update(key, value, false)
			.then(() => {
				resolve();
			});
		});
	}

	getWorkspaceState(key: string) {
		const value: string = this.context.workspaceState.get(key);
		if (!value) {
			return undefined;
		}
		return value;
	}

	updateWorkspaceState(key: string, value: string) {
		return new Promise(resolve => {
			this.context.workspaceState.update(key, value)
			.then(() => {
				resolve();
			});
		});
			
	}
}
