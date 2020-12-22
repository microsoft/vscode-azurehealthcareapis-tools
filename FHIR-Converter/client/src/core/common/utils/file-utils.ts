/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
		
export function writeJsonToFile(filePath: string, msg: object) {
	const flag = checkCreateFolders(path.dirname(filePath));
	fs.writeFileSync(filePath, JSON.stringify(msg, null, 4));
	return flag;
}

export function checkCreateFolders(resultFolder: string) {
	if (!fs.existsSync(resultFolder)) {
		fs.mkdirSync(resultFolder, { recursive: true });
		return false;
	}
	return true;
}

export function getAllPaths(directory: string, pattern: string): string[] {
	const searchPattern = directory + pattern;
	const files: string[] = glob.sync(searchPattern, {}).map(uri => uri.replace(/\\/g, '/'));
	return files;
}

export async function isEmptyDir(dirname) {
	const dirIter = await fs.promises.opendir(dirname);
	const result = await dirIter[Symbol.asyncIterator]().next();
	if (!result.done) {
		await dirIter.close();
	}
	return result.done;
}
