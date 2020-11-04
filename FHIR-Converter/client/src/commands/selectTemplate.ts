import { ConverterError } from '../models/converter-error.model';
import { FileType } from '../models/file-type.model';
import { ErrorHandler } from '../common/error-handler';
import * as interaction from '../common/interaction';

export async function selectTemplateCommand(event) {
	try{
		interaction.selectFileFromExplorer(event, FileType.template);
	}catch(error){
		new ErrorHandler(ConverterError.selectTemplateError, error).handle();
	}
}
