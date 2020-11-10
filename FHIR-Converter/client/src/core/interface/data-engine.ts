import { DataType } from '../enum/data-type';
import { IEngineOption } from './engine-option';

export interface IDataEngine {
	type: DataType;
	process(engineOption: IEngineOption): any;
}
