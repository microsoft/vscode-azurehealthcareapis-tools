/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as cp from 'child_process';
import * as templateManagementConstants from '../common/constants/template-management';
import { TemplateManagementError } from '../../core/common/errors/template-management-error';
import { ITemplateManager } from './template-manager';

export class AcrTemplateManager implements ITemplateManager {
	private _orasExePath: string;
	private _templateManagementExePath: string;
	
	constructor (templateManagementExePath = templateManagementConstants.DefaultTemplateManagementExePath, orasExePath = templateManagementConstants.DefaultOrasExePath) {
		this._templateManagementExePath = templateManagementExePath;
		this._orasExePath = orasExePath;
	}

	login(registryName: string) {
		// Return cmd string to use terminal
		return `${this._orasExePath} login "${registryName}"`;
	}

	logout(registryName: string) {
		try {
			cp.execFileSync(this._orasExePath, ['logout', `"${registryName}"`]);
			return 'Logout succeeded.';
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}

	pullTemplates(imageReference: string, outputFolder: string, force: boolean) {
		try {
			const paramList = ['pull', `"${imageReference}"`, `"${outputFolder}"`];
			if (force) {
				paramList.push('-f');
			}
			const output = cp.execFileSync(this._templateManagementExePath, paramList);
			return output.toString();
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}

	pushTemplates(imageReference: string, inputFolder: string) {
		try {
			const output = cp.execFileSync(this._templateManagementExePath, ['push', `"${imageReference}"`, `"${inputFolder}"`]);
			return output.toString();
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}
}
