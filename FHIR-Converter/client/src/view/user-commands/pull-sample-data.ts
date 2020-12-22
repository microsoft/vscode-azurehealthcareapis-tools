/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as templateManagementConstants from '../../core/common/constants/template-management';
import { pullImage } from '../common/registry/pull-image';

export async function pullSampleDataCommand() {
	// Get the image reference
	const imageReference = templateManagementConstants.SampleDataReference;

	// Pull image
	await pullImage(imageReference, true);
}
