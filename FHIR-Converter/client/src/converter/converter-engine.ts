import { DataType } from '../models/data-type.model';

export interface IConverterEngine {
	type: DataType;

	convert(dataContext: string, entryTemplate: string, templateFolder: string, resultFolder: string): any;
}
  