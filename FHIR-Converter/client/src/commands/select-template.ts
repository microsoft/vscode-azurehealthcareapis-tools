import { FileType } from '../core/enum/file-type';
import { selectFileFromExplorer } from './command-helper/select-file-from-explorer';

export async function selectTemplateCommand(event) {
	// Select a template from explorer according to the FileType
	await selectFileFromExplorer(event, FileType.template);
}
