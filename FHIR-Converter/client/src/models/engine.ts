import { DataType } from './data-type';
import { IEngineOption } from './engine-option';

export interface IEngine {
	type: DataType;
	exePath: string;
	convert(engineOption: IEngineOption): any;
}
