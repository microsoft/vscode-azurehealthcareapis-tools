import { ConverterError, FileType } from '../common/constants';
import { ErrorHandler } from '../common/error-handler';
import { selectFileFromExplorer } from '../common/utils';

export async function selectDataCommand(event) {
	try{
		selectFileFromExplorer(event, FileType.data);
	}
	catch(error){
		new ErrorHandler(ConverterError.selectDataError, error).handle();
	}
}

