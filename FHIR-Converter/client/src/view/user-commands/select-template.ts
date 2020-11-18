import { FileType } from '../../core/common/enum/file-type';
import { selectFileFromExplorer } from '../common/explorer/select-file-from-explorer';

export async function selectTemplateCommand(event) {
	// Select a template from explorer according to the FileType
	await selectFileFromExplorer(event, FileType.Template);
}
