/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as path from 'path';

export const DefaultTemplateManagementExePath = path.join(__dirname, '../../../../engine/Microsoft.Health.Fhir.Liquid.Converter.Tool.exe');
export const DefaultOrasExePath = path.join(__dirname, '../../../../engine/oras.exe');
export const SampleDataReference = 'healthplatformregistry.azurecr.io/hl7v2sampledata:v3.1.2';
export const OfficialImageBaseReference = 'healthplatformregistry.azurecr.io/hl7v2defaulttemplates';
export const OfficialRepoTokenUrl = 'https://healthplatformregistry.azurecr.io/oauth2/token?scope=repository:*:*&service=healthplatformregistry.azurecr.io';
export const OfficialRepoTagsUrl = 'https://healthplatformregistry.azurecr.io/acr/v1/hl7v2defaulttemplates/_tags';
