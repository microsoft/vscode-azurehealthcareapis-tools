import { IDataEngine } from '../interface/data-engine';
import { Hl7v2ConverterEngine } from './hl7v2-converter-engine';
import { DataType } from '../enum/data-type';

export class ConverterEngineFactory {
	private _converterEngine: IDataEngine;

	private _createEngine(dataType: DataType): IDataEngine {
		if (dataType === DataType.hl7v2) {
			this._converterEngine = new Hl7v2ConverterEngine(DataType.hl7v2)
			return this._converterEngine;
		}
		return undefined;
	}

	getEngine(dataType: DataType): IDataEngine {
		if (this._converterEngine && this._converterEngine.type === dataType) {
			return this._converterEngine;
		} else {
			return this._createEngine(dataType);
		}
	}
}
