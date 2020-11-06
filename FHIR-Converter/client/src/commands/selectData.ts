import { FileType } from '../models/file-type';
import { selectFileFromExplorer } from './selectFileFromExplorer';

export async function selectDataCommand(event) {
	await selectFileFromExplorer(event, FileType.data);
}

