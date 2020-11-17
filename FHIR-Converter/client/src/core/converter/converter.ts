import * as stringUtils from '../common/utils/string-utils';
import * as fileUtils from '../common/utils/file-utils';
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
		return this._engine.process(dataFile);
	}

	getHistory(filePath: string) {
		const resultName = stringUtils.getFileNameWithoutTwoExt(filePath);
		const files: string[] = fileUtils.getAllPaths(this._resultFolder, `/**/${resultName}.*.json`);
		const sorted_files = stringUtils.getDescendingSortString(files);
		return sorted_files;
	}
}
