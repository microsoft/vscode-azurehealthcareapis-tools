import { IEngine } from '../models/engine';
import { ConverterEngineOption } from './converter-engine-option';
import * as constants from '../common/constants';
import { DataType } from '../models/data-type';
import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';

export class Hl7v2ConverterEngine implements IEngine {
	type: DataType;
	exePath: string = path.join(__dirname, constants.DefaultHl7v2ExePath);
	
	constructor(type: DataType, exePath?: string) { 
		this.type = type; 
		if (exePath) {
			this.exePath = exePath;
		}
	}

	convert(engineOption: ConverterEngineOption): any {
		cp.execFileSync(this.exePath, ['-d', engineOption.templateFolder, '-n',  engineOption.template, '-c', engineOption.data, '-f', engineOption.resultFile]);
		const returnMsg = JSON.parse(fs.readFileSync(engineOption.resultFile).toString());
		return returnMsg;
	}
}
