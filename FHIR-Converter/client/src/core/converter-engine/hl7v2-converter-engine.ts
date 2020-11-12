import { IDataEngine } from '../interface/data-engine';
import { ConverterEngineOption } from '../interface/converter-engine-option';
import * as constants from '../../common/constants';
import { DataType } from '../enum/data-type';
import * as fs from 'fs';
import * as cp from 'child_process';

export class Hl7v2ConverterEngine implements IDataEngine {
	private _type: DataType;
	private _exePath: string = constants.DefaultHl7v2ExePath;
	
	constructor(type: DataType) { 
		this._type = type; 
	}

	public get type() {
		return this._type;
	}

	public set type(type: DataType) {
		this._type = type;
	}

	public get exePath() {
		return this._exePath;
	}

	public set exePath(exePath: string) {
		this._exePath = exePath;
	}

	process(engineOption: ConverterEngineOption): any {
		cp.execFileSync(this._exePath, ['-d', engineOption.templateFolder, '-n',  engineOption.template, '-c', engineOption.data, '-f', engineOption.resultFile]);
		const returnMsg = JSON.parse(fs.readFileSync(engineOption.resultFile).toString());
		return returnMsg;
	}
}
