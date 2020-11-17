import { FileType } from '../../core/common/enum/file-type';
import { selectFileFromExplorer } from './share/select-file-from-explorer';

export async function selectDataCommand(event) {
	// Select a data file from explorer according to the FileType
	await selectFileFromExplorer(event, FileType.Data);
}
