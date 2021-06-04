/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import { pullImage } from '../common/registry/pull-image';
import { showQuickPick } from '../common/input/quick-pick';
import * as constants from '../../core/common/constants/template-management';
import localize from '../../i18n/localize';
import { getToken, getAcrTags} from '../../core/http/acr-request';
import { TemplateType } from '../../core/common/enum/template-type';

export async function pullOfficialTemplatesCommand() {
	// Get all template version tags on the ACR	
	const tokenUrl = constants.OfficialRepoTokenUrl;
	const token = await getToken(tokenUrl);

	// Get the template type
	const selectedTemplateType = await showQuickPick(localize('message.selectTemplateType'), Object.values(TemplateType));
	let tagsUrl, templateImageBaseReference;
	if(selectedTemplateType == TemplateType.hl7v2) {
		tagsUrl = constants.Hl7v2TagsUrl;
		templateImageBaseReference = constants.Hl7v2ImageBaseReference;
	} else if (selectedTemplateType == TemplateType.ccda) {
		tagsUrl = constants.CcdaTagsUrl;
		templateImageBaseReference = constants.CcdaImageBaseReference;
	}
	
	if (tagsUrl && templateImageBaseReference) {
		const tags = await getAcrTags(tagsUrl, token);
		// Get the version
		const selectedVersion = await showQuickPick(localize('message.selectTemplateVesion'), tags);
		if (selectedVersion) {
			// If user selected a version, pull the image with this verison
			const imageReference = `${templateImageBaseReference}:${selectedVersion}`;
			await pullImage(imageReference, localize('message.pullingTemplates'));
		}
	}
}
