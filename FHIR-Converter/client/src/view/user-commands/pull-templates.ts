/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as workspaceStateConstants from '../../core/common/constants/workspace-state';
import localize from '../../i18n/localize';
import { showInputBox } from '../common/input/input-box';
import { pullImage } from '../common/registry/pull-image';

export async function pullTemplatesCommand() {
	// Get the image reference
	const imageReference = await showInputBox(localize('message.inputPullImageReference'), workspaceStateConstants.ImageReferenceKey);
	if (!imageReference) {
		return undefined;
	}
	
	// Pull image
	await pullImage(imageReference, localize('message.pullingTemplates'));
}
