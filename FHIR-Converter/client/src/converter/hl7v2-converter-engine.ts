import { IConverterEngine } from './converter-engine';
import { DataType } from '../models/data-type.model';
import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';

export class Hl7v2ConverterEngine implements IConverterEngine {
	type: DataType;
	exePath: string = path.join(__dirname, "../../engine/Microsoft.Health.Fhir.Converter.Tool.exe");
	
	constructor(type: DataType, exePath?: string) { 
		this.type = type; 
		if (exePath) {
			this.exePath = exePath;
		}
	}

	convert(dataContext: string, entryTemplate: string, templateFolder: string, resultFolder: string): any {
		const resultFile = path.join(resultFolder, 'temp.json');
		cp.execFileSync(this.exePath, ['-d', templateFolder, '-n',  entryTemplate, '-c', dataContext, '-f', resultFile]);
		const returnMsg = JSON.parse(fs.readFileSync(resultFile).toString());
		return returnMsg;
	}
	
}
  
