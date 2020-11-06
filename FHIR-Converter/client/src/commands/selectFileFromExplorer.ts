import { globals } from '../init/globals';
import localize from '../localize';
import { FileType } from '../models/file-type';
import { fhirConversion } from '../commands/fhirConversion';
import { ConversionError } from '../errors/conversion-error';
import * as interaction from '../common/interaction';

export async function selectFileFromExplorer(event: any, type: FileType) {
	if (event && event.fsPath) {
		interaction.updateActiveFile(event.fsPath, type);
		await fhirConversion(globals.activeDataPath, globals.activeTemplatePath);
	} else {
		throw new ConversionError(localize('message.failSelectFile'));
	}
}
