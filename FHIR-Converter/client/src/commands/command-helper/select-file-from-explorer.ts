import { globals } from '../../init/globals';
import localize from '../../localize';
import { FileType } from '../../core/enum/file-type';
import { convertAndDiffCommand } from '../convert-and-diff';
import { ConversionError } from '../../common/errors/conversion-error';

export async function selectFileFromExplorer(event: any, type: FileType) {
	if (event && event.fsPath) {
		globals.settingManager.updateActiveFile(event.fsPath, type);
		await convertAndDiffCommand();
	} else {
		throw new ConversionError(localize('message.failSelectFile'));
	}
}
