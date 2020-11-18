/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as fs from 'fs';
import * as stringUtils from '../common/utils/string-utils';
import * as fileUtils from '../common/utils/file-utils';
import * as engineConstants from '../common/constants/engine';
import { IConverterEngine } from './engine/converter-engine';

export class Converter {
	private _engine: IConverterEngine;
	private _resultFolder: string;
	
	constructor (engine: IConverterEngine, resultFolder: string) {
		this._engine = engine;
		this._resultFolder = resultFolder;
	}

	public get engine() {
		return this._engine;
	}

	public set engine(engine: IConverterEngine) {
		this._engine = engine;
	}

	public get resultFolder() {
		return this._resultFolder;
	}

	public set resultFolder(resultFolder: string) {
		this._resultFolder = resultFolder;
	}

	convert(dataFile: string) {
		const resultFile = this._engine.process(dataFile);
		this.clearHistory(resultFile);
		return resultFile;
	}

	getHistory(filePath: string) {
		const resultName = stringUtils.getFileNameWithoutTwoExt(filePath);
		const files: string[] = fileUtils.getAllPaths(this._resultFolder, `/**/${resultName}.*.json`);
		const sortedFiles = stringUtils.getDescendingSortString(files);
		return sortedFiles;
	}

	clearHistory(filePath: string, maxNum = engineConstants.MaxHistoryFilesNum, remainNum = engineConstants.RemainHistoryFilesNum) {
		const files = this.getHistory(filePath);
		if (files.length > maxNum) {
			const deleteFiles = files.slice(remainNum, files.length);
			for (const fileId in deleteFiles) {
				fs.unlink(deleteFiles[fileId], (err) => {
					if (err) { 
						throw err; 
					}
				  });
			}
		}
	}
}
