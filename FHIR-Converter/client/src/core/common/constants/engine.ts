/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as path from 'path';

export const DefaultResultFile = 'temp.json';
export const DefaultEngineExecCmd = 'dotnet Microsoft.Health.Fhir.Liquid.Converter.Tool.dll';
export const DefaultEngineOrasPackageName = 'oras_osx_amd64.tar.gz';
export const DefaultEngineOrasName = 'oras';
export const DefaultEngineFolder = path.join(__dirname, '../../../../engine');
export const TemplateFileExt = '.liquid';
export const MaxHistoryFilesNum = 20;
export const RemainHistoryFilesNum = 2;
