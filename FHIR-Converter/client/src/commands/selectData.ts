import { ConverterError } from '../models/converter-error.model';
import { FileType } from '../models/file-type.model';
import { ErrorHandler } from '../common/error-handler';
import * as interaction from '../common/interaction';

export async function selectDataCommand(event) {
	try{
		interaction.selectFileFromExplorer(event, FileType.data);
	}
	catch(error){
		new ErrorHandler(ConverterError.selectDataError, error).handle();
	}
}

