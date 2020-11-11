import { FileType } from '../core/enum/file-type';
import { selectFileFromExplorer } from './command-helper/select-file-from-explorer';

export async function selectTemplateCommand(event) {
	await selectFileFromExplorer(event, FileType.template);
}
