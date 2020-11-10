import { IDataEngine } from '../interface/data-engine';
import { Hl7v2ConverterEngine } from './hl7v2-converter-engine';
import { DataType } from '../enum/data-type';
import { ConfigurationError } from '../../common/errors/configuration-error';
import localize from '../../localize';

export class ConverterEngineProvider {
	private converterEngine: IDataEngine;

	createEngine(dataType): IDataEngine {
		if (dataType === DataType.hl7v2) {
			return new Hl7v2ConverterEngine(DataType.hl7v2);
		}
		throw new ConfigurationError(localize('message.converterEngineNotSupported', dataType));
	}

	getEngine(dataType): IDataEngine {
		if (this.converterEngine && this.converterEngine.type === dataType) {
			return this.converterEngine;
		} else {
			return this.createEngine(dataType);
		}
	}
}
