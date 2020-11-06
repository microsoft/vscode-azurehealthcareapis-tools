import { DataType } from '../models/data-type';

export interface IConverterEngine {
	type: DataType;
	exePath: string;
	convert(dataContext: string, entryTemplate: string, templateFolder: string, resultFolder: string): any;
}
  
