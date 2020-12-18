/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import * as workspaceStateConstants from '../../core/common/constants/workspace-state';
import { globals } from '../../core/globals';
import { pullImage } from '../common/registry/pull-image';

export async function pullTemplatesCommand() {
	// Get the image reference
	const inputBoxOption = { placeHolder: 'Input your image reference' };
	let imageReference = globals.settingManager.getWorkspaceState(workspaceStateConstants.ImageReferenceKey);
	if (imageReference) {
		inputBoxOption['value'] = imageReference;
	}
	imageReference = await vscode.window.showInputBox(inputBoxOption);
	if (imageReference) {
		await globals.settingManager.updateWorkspaceState(workspaceStateConstants.ImageReferenceKey, imageReference);
	} else {
		return undefined;
	}

	// Pull image
	await pullImage(imageReference);
}
