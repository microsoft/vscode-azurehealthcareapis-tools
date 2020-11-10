import { FileType } from '../models/file-type';
import { selectFileFromExplorer } from './select-file-from-explorer';

export async function selectTemplateCommand(event) {
	await selectFileFromExplorer(event, FileType.template);
}
