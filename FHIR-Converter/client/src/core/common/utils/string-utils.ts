/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as path from 'path';

export function getFileNameExt(filePath: string): string {
	return path.extname(filePath);
}

export function convertPrettyJsonString(json: object) {
	return JSON.stringify(json, null, 4);
}

export function generatePrettyFolderName(templateFolder: string, templateFolderSuffix: string) {
	return path.basename(templateFolder) + ' ' + templateFolderSuffix;
}

export function getStatusBarString(activeDataPath: string | undefined, activeTemplatePath: string | undefined, 
	extensionTitle: string, dataTitle: string, templateTitle: string) {
	let dataName = 'none';
	let templateName = 'none';
	if (activeDataPath) {
		dataName = path.basename(activeDataPath);
	}
	if (activeTemplatePath) {
		templateName = path.basename(activeTemplatePath);
	}
	const str = `${extensionTitle}: ${dataTitle} - ${dataName}, ${templateTitle} - ${templateName}`;
	return str;
}

export function getFileNameWithoutExt(filePath: string): string {
	const fileName = path.basename(filePath);
	return fileName.substring(0, fileName.lastIndexOf('.'));
}

export function getResultFileName(dataPath: string, templatePath: string, timestamp: string) {
	const dataName = getFileNameWithoutExt(dataPath);
	const templateName = getFileNameWithoutExt(templatePath);
	const resultName = `${dataName} - ${templateName}.json`;
	return addTimestamp(resultName, timestamp);
}

export function getDiffResultFileName(resultFilePath1: string, resultFilePath2: string) {
	// If want to show the timestamp, we can do as follow:
	const timestamp1 = getTimestamp(resultFilePath1);
	const timestamp2 = getTimestamp(resultFilePath2);
	const fileName = getFileNameWithoutTwoExt(resultFilePath1);
	return `${fileName} (cmp:${timestamp1}/${timestamp2}).json`;
	// const fileName = getFileNameWithoutTwoExt(resultFilePath1);
	// return `${fileName}.json`;
}

export function getFileNameWithoutTwoExt(resultFilePath: string) {
	return getFileNameWithoutExt(getFileNameWithoutExt(resultFilePath));
}
export function getTimestamp(filePath: string) {
	const timestampExt = getFileNameExt(getFileNameWithoutExt(filePath));
	return timestampExt.substring(1, timestampExt.length);
}

export function addTimestamp(filePath: string, timestamp: string) {
	return `${getFileNameWithoutExt(filePath)}.${timestamp}${getFileNameExt(filePath)}`;
}

export function getDescendingSortString(list: string[]) {
	return list.sort( (n1, n2) => {
		if (n1 < n2) {
			return 1;
		}
		if (n1 > n2) {
			return -1;
		}
		return 0;
	});
}
