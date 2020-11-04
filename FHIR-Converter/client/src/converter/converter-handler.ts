import { IConverterEngine } from './converter-engine';
import { Hl7v2ConverterEngine } from './hl7v2-converter-engine';
import { DataType } from '../models/data-type.model';

export class ConverterHandler{
	private coverterEngine: IConverterEngine;

	createEngine(dataType): IConverterEngine {
		if (dataType === DataType.hl7v2)
			return new Hl7v2ConverterEngine(DataType.hl7v2);
	}

	getEngine(dataType): IConverterEngine{
		if(this.coverterEngine && dataType === DataType.hl7v2)
			return this.coverterEngine;
		else{
			return this.createEngine(dataType);
		}
	}
}