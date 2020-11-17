import * as fs from 'fs';
import * as cp from 'child_process';
import * as path from 'path';
import localize from '../../../i18n/localize';
import { IConverterEngine } from './converter-engine';
import { ConversionError } from '../../common/errors/conversion-error';
import * as engineConstants from '../../common/constants/engine';
import * as stringUtils from '../../common/utils/string-utils';
import * as engineUtils from '../../common/utils/engine-utils';
import * as fileUtils from '../../common/utils/file-utils';

export class Hl7v2FhirConverterEngine implements IConverterEngine {
	private _exePath: string = engineConstants.DefaultHl7v2ExePath;
	private _templateFolder: string;
	private _entryTemplate: string;
	private _resultFolder: string;

	constructor(templateFolder: string, entryTemplate: string, resultFolder: string) {
		this._templateFolder = templateFolder;
		this._entryTemplate = entryTemplate;
		this._resultFolder = resultFolder;
	}

	public get exePath() {
		return this._exePath;
	}

	public set exePath(exePath: string) {
		this._exePath = exePath;
	}

	public get templateFolder() {
		return this._templateFolder;
	}

	public set templateFolder(_templateFolder: string) {
		this._templateFolder = _templateFolder;
	}

	public get entryTemplate() {
		return this._entryTemplate;
	}

	public set entryTemplate(entryTemplate: string) {
		this._entryTemplate = entryTemplate;
	}

	public get resultFolder() {
		return this._resultFolder;
	}

	public set resultFolder(resultFolder: string) {
		this._resultFolder = resultFolder;
	}

	process(dataFile: string) {
		const timestamp = new Date().getTime().toString();
		const resultFile = path.join(this._resultFolder, stringUtils.getResultFileName(dataFile, this._entryTemplate, timestamp));
		const tempFile = path.join(this._resultFolder, engineConstants.DefaultResultFile);
		const entryTemplate = stringUtils.getFileNameWithoutExt(path.basename(this.entryTemplate));
		const data = fs.readFileSync(dataFile).toString().replace(/^\uFEFF/, '');
		if (data.length === 0) {
			throw new ConversionError(localize('message.dataIsEmpty'));
		}
		cp.execFileSync(this._exePath, ['-d', this._templateFolder, '-n',  entryTemplate, '-c', data, '-f', tempFile]);
		if (fs.existsSync(tempFile)) {
			const resultMsg = JSON.parse(fs.readFileSync(tempFile).toString());
			if (!engineUtils.checkEngineStatus(resultMsg)) {
				throw new ConversionError(resultMsg.ErrorMessage);
			}
			fileUtils.checkFolderWritePrettyJson(resultFile, resultMsg.FhirResource);
			return resultFile;
		} else {
			return undefined;
		}
	}
}
