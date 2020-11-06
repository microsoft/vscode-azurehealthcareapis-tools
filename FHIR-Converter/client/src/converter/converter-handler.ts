import { IConverterEngine } from './interface-converter-engine';
import { Hl7v2ConverterEngine } from './hl7v2-converter-engine';
import { DataType } from '../models/data-type';
import { ConversionError } from '../errors/conversion-error';
import localize from '../localize';

export class ConverterHandler {
	private converterEngine: IConverterEngine;

	createEngine(dataType): IConverterEngine {
		if (dataType === DataType.hl7v2) {
			return new Hl7v2ConverterEngine(DataType.hl7v2);
		}
		throw new ConversionError(localize('message.converterEngineNotSupported', dataType));
	}

	getEngine(dataType): IConverterEngine {
		if (this.converterEngine && dataType === DataType.hl7v2) {
			return this.converterEngine;
		} else {
			return this.createEngine(dataType);
		}
	}
}
