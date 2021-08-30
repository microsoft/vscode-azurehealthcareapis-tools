/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

const Hl7v2TemplatesImage = 'hl7v2defaulttemplates';
const CcdaTemplatesImage = 'ccdadefaulttemplates';
const OfficialLoginServer = 'healthplatformregistry.azurecr.io';
export const Hl7v2SampleDataReference = `${OfficialLoginServer}/hl7v2sampledata:latest`;
export const CcdaSampleDataReference = `${OfficialLoginServer}/ccdasampledata:latest`;
export const Hl7v2ImageBaseReference = `${OfficialLoginServer}/${Hl7v2TemplatesImage}`;
export const CcdaImageBaseReference = `${OfficialLoginServer}/${CcdaTemplatesImage}`;
export const OfficialRepoTokenUrl = `https://${OfficialLoginServer}/oauth2/token?scope=repository:*:*&service=${OfficialLoginServer}`;
export const Hl7v2TagsUrl = `https://${OfficialLoginServer}/acr/v1/${Hl7v2TemplatesImage}/_tags`;
export const CcdaTagsUrl = `https://${OfficialLoginServer}/acr/v1/${CcdaTemplatesImage}/_tags`;
