/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { FileType } from '../../core/common/enum/file-type';
import { selectFileFromExplorer } from '../common/explorer/select-file-from-explorer';

export async function selectDataCommand(event) {
	
	// Select a data file from explorer according to the FileType
	await selectFileFromExplorer(event, FileType.Data);
}
