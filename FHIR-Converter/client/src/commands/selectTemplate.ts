import { ConverterError, FileType } from '../common/constants';
import { ErrorHandler } from '../common/error-handler';
import { selectFileFromExplorer } from '../common/utils';

export async function selectTemplateCommand(event) {
	try{
		selectFileFromExplorer(event, FileType.template);
	}
	catch(error){
		new ErrorHandler(ConverterError.selectTemplateError, error).handle();
	}
}