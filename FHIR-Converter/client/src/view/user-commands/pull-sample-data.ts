/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as constants from '../../core/common/constants/template-management';
import { pullImage } from '../common/registry/pull-image';
import localize from '../../i18n/localize';
import { TemplateType } from '../../core/common/enum/template-type';
import { showQuickPick } from '../common/input/quick-pick';

export async function pullSampleDataCommand() {
	// Get the template type
	const selectedType = await showQuickPick(localize('message.selectSampleDataType'), Object.values(TemplateType));
	let imageReference;
	if(selectedType == TemplateType.hl7v2) {
		imageReference = constants.Hl7v2SampleDataReference;
	} else if (selectedType == TemplateType.ccda) {
		imageReference = constants.CcdaSampleDataReference;
	}

	// Pull image
	if (imageReference) {
		await pullImage(imageReference, localize('message.pullingSampleData'));
	}
	
}
