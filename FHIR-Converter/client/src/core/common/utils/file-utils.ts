/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
		
export function checkFolderWritePrettyJson(fileName: string, msg: object) {
	const flag = checkCreateFolders(path.dirname(fileName));
	writePrettyJson(fileName, msg);
	return flag;
}

export function checkCreateFolders(resultFolder: string) {
	if (!fs.existsSync(resultFolder)) {
		fs.mkdirSync(resultFolder, { recursive: true });
		return false;
	} else {
		return true;
	}
}

export function writePrettyJson(filePath: string, json: object) {
	fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
}

export  function getAllPaths(directory: string, pattern: string): string[] {
	const searchPattern = directory + pattern;
	const files: string[] = glob.sync(searchPattern, {}).map(uri => uri.replace(/\\/g, '/'));
	return files;
}
