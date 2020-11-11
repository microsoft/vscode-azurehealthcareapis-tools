import { FileType } from '../core/enum/file-type';
import { selectFileFromExplorer } from './command-helper/select-file-from-explorer';

export async function selectDataCommand(event) {
	// Select a data file from explorer according to the FileType
	await selectFileFromExplorer(event, FileType.data);
}
