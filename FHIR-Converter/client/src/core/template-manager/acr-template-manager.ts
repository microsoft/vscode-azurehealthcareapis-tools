/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as cp from 'child_process';
import * as engineConstants from '../common/constants/engine';
import * as stringUtils from '../common/utils/string-utils';
import { TemplateManagementError } from '../../core/common/errors/template-management-error';
import { ITemplateManager } from './template-manager';
import { PlatformHandler } from '../platform/platform-handler';
import * as path from 'path';

export class AcrTemplateManager implements ITemplateManager {
	private _orasExecCmd: string;
	private _engineExecCmd: string;

	constructor (engineExecCmd = engineConstants.DefaultEngineExecCmd, 
		orasExecCmd = PlatformHandler.getInstance().getPlatformData().orasExecCmd) {
		this._engineExecCmd = engineExecCmd;
		this._orasExecCmd = orasExecCmd;
	}

	login(registryName: string) {
		// Return cmd string to use terminal
		const orasExecCmd = path.join(engineConstants.DefaultEngineFolder, this._orasExecCmd);
		return `${orasExecCmd} login ${registryName}`;
	}

	logout(registryName: string) {
		try {
			const orasExecCmd = path.join(engineConstants.DefaultEngineFolder, this._orasExecCmd);
			const paramList = [' logout', registryName];
			const cmd =  orasExecCmd + paramList.join(' ');
			cp.execSync(cmd);
			return 'Logout succeeded.';
		} catch (err) {
			if (err.stderr) {
				throw new TemplateManagementError(err.stderr.toString());
			} else {
				throw new TemplateManagementError(err.message);
			}
		}
	}

	pullTemplates(imageReference: string, outputFolder: string, force: boolean) {
		try {
			const paramList = [' pull', stringUtils.addQuotes(imageReference), stringUtils.addQuotes(outputFolder)];
			if (force) {
				paramList.push('-f');
			}
			const cmd =  this._engineExecCmd + paramList.join(' ');
			const output = cp.execSync(cmd, {
				cwd: engineConstants.DefaultEngineFolder
			});
			return output.toString();
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}

	pushTemplates(imageReference: string, inputFolder: string) {
		try {
			const paramList = [' push', stringUtils.addQuotes(imageReference), stringUtils.addQuotes(inputFolder)];
			const cmd =  this._engineExecCmd + paramList.join(' ');
			const output = cp.execSync(cmd, {
				cwd: engineConstants.DefaultEngineFolder
			});
			return output.toString();
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}
}
