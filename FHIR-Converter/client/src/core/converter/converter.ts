/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as stringUtils from '../common/utils/string-utils';
import localize from '../../i18n/localize';
import * as fileUtils from '../common/utils/file-utils';
import { IConverterEngine } from './engine/converter-engine';
import { ConversionError } from '../../core/common/errors/conversion-error';

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
		return this._engine.process(dataFile);
	}

	getHistory(filePath: string) {
		const resultName = stringUtils.getFileNameWithoutTwoExt(filePath);
		const files: string[] = fileUtils.getAllPaths(this._resultFolder, `/**/${resultName}.*.json`);
		const sortedFiles = stringUtils.getDescendingSortString(files);
		return sortedFiles;
	}
}
