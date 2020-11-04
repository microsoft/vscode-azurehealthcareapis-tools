import { ConverterError } from '../models/converter-error.model';
import { FileType } from '../models/file-type.model';
import * as ErrorHandler from '../common/error-handler';
import * as interaction from '../common/interaction';

export async function selectTemplateCommand(event) {
	try {
		await interaction.selectFileFromExplorer(event, FileType.template);
	} catch (error) {
		ErrorHandler.handle(ConverterError.selectTemplateError, error);
	}
}
