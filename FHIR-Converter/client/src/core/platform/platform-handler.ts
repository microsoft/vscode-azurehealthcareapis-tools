/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as osUtils from '../common/utils/os-utils';
import { WindowsPlatformData } from './Windows-platform-data';
import { MacPlatformData } from './mac-platform-data';
import { IPlatformData } from './platform-data';
import * as cp from 'child_process';
import * as engineConstants from '../common/constants/engine';
import { TemplateManagementError } from '../common/errors/template-management-error';
import * as path from 'path';
import * as os from 'os';

export class PlatformHandler {
	private static _instance = new PlatformHandler();
	private platformData: IPlatformData;
	private supportedOS: Array<string> = ['win32', 'darwin'];
	
	private constructor() {
		if (osUtils.isWindows()) {
			this.platformData = new WindowsPlatformData();
		} else if (osUtils.isMac()) {
			this.platformData = new MacPlatformData();
		}
	}

	static getInstance(): PlatformHandler {
		return PlatformHandler._instance;
	}

	getPlatformData(): IPlatformData {
		return this.platformData;
	}

	isSupporedOS(): Boolean {
		if (this.supportedOS.includes(os.platform())) {
			return true;
		}
		return false;
	}

	extractOras() {
		try {
			if (osUtils.isMac()) {
				const renameCmd = `mv ${engineConstants.DefaultEngineOrasName} ${this.platformData.orasExecCmd}`;
				const tarCmd =  `tar -zxvf ${engineConstants.DefaultEngineOrasPackageName}`;
				const cmd = `${tarCmd}; ${renameCmd}`;
				cp.execSync(cmd, {
					cwd: engineConstants.DefaultEngineFolder
				});
			}
		} catch (err) {
			throw new TemplateManagementError(err.stderr.toString());
		}
	}

	getDefaultWorkspaceUri(folder: string) {
		if (this.platformData.defaultWorkspaceFile) {
			return path.join(folder, this.platformData.defaultWorkspaceFile);
		}
		return folder;
	}
}
