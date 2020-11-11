import { globals } from '../../init/globals';
import localize from '../../localize';
import { FileType } from '../../core/enum/file-type';
import { convertAndDiffCommand } from '../convert-and-diff';
import { ConversionError } from '../../common/errors/conversion-error';

export async function selectFileFromExplorer(event: any, type: FileType) {
	if (event && event.fsPath) {
		// Update the active file
		globals.settingManager.updateActiveFile(event.fsPath, type);
		// Execute the conversion process and show the differential view
		await convertAndDiffCommand();
	} else {
		throw new ConversionError(localize('message.failSelectFile'));
	}
}
