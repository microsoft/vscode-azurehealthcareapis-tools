/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */
import { TemplateType } from '../enum/template-type'

const OfficialLoginServer = 'healthplatformregistry.azurecr.io';
const Hl7v2TemplatesImage = 'hl7v2defaulttemplates';
const CcdaTemplatesImage = 'ccdadefaulttemplates';

export const OfficialRepoTokenUrl = `https://${OfficialLoginServer}/oauth2/token?scope=repository:*:*&service=${OfficialLoginServer}`;

export const ImageTagsUrls = {
	[TemplateType.hl7v2]: `https://${OfficialLoginServer}/acr/v1/${Hl7v2TemplatesImage}/_tags`,
	[TemplateType.ccda]: `https://${OfficialLoginServer}/acr/v1/${CcdaTemplatesImage}/_tags`
};

export const SampleDataImageReferences = {
	[TemplateType.hl7v2]: `${OfficialLoginServer}/hl7v2sampledata:latest`,
	[TemplateType.ccda]: `${OfficialLoginServer}/ccdasampledata:latest`
};

export const TemplateImageBaseReferences = {
	[TemplateType.hl7v2]: `${OfficialLoginServer}/${Hl7v2TemplatesImage}`,
	[TemplateType.ccda]: `${OfficialLoginServer}/${CcdaTemplatesImage}`
};
