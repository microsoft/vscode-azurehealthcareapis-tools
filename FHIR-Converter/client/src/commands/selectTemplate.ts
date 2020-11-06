import { FileType } from '../models/file-type';
import { selectFileFromExplorer } from './selectFileFromExplorer';

export async function selectTemplateCommand(event) {
	await selectFileFromExplorer(event, FileType.template);
}
