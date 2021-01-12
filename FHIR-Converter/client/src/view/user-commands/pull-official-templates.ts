/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import { pullImage } from '../common/registry/pull-image';
import { showQucikPick } from '../common/input/quick-pick';
import * as constants from '../../core/common/constants/template-management';
import localize from '../../i18n/localize';
import { getToken, getAcrTags} from '../../core/http/acr-request';

export async function pullOfficialTemplatesCommand() {
	// Get all template version tags on the ACR	
	const tokenUrl = constants.OfficialRepoTokenUrl;
	const tagsUrl = constants.OfficialRepoTagsUrl;
	const token = await getToken(tokenUrl);
	const tags = await getAcrTags(tagsUrl, token);

	// Get the user input
	const selected = await showQucikPick(localize('message.selectTemplateVesion'), tags);
	if (selected) {
		// If user selected a version, pull the image with this verison
		const imageReference = `${constants.OfficialImageBaseReference}:${selected}`;
		await pullImage(imageReference, localize('message.pullingTemplates'));
	}
}
