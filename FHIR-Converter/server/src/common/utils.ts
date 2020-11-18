/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as path from 'path';
import * as glob from 'glob';
import * as constants from '../common/constants'; 

export function addUnderlineExt(filePath: string) {
	filePath = path.join(path.dirname(filePath), '_' + path.basename(filePath) + constants.EngineTemplateFileExt);
	filePath = filePath.replace(/\\/g, '/');
	return filePath;
}

export function getSnippetTemplateName(dirname: string, basename: string): string {
	return "\'" + path.join(dirname, basename.substring(1, basename.length)).replace(constants.EngineTemplateFileExt, '').replace(/\\/g, '/') + "\'";
}

export  function getAllTemplatePaths(directory: string): string[] {
	const searchPattern = directory + `/**/*${constants.EngineTemplateFileExt}`;
	const files: string[] = glob.sync(searchPattern, {}).map(uri => path.relative(directory, uri).replace(/\\/g, '/'));
	return files;
}
