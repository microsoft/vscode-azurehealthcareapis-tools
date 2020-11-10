import { FileType } from '../core/enum/file-type';
import { selectFileFromExplorer } from './select-file-from-explorer';

export async function selectDataCommand(event) {
	await selectFileFromExplorer(event, FileType.data);
}
