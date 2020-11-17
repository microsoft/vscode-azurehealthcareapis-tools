export interface IConverterEngine {
	resultFolder: string;
	process(dataFile: string): any;
}
