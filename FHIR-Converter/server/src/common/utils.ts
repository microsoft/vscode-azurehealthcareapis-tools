/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as path from 'path';
import * as glob from 'glob';
import * as constants from '../common/constants';

export function addUnderlineExt(filePath: string) {
	const dirname = path.dirname(filePath);
	const filenameWithExt = path.join(path.basename(filePath) + constants.EngineTemplateFileExt);
	if (dirname === '.') {
		filePath = filenameWithExt;
	} else {
		filePath = path.join(dirname, '_' + filenameWithExt);
	}
	filePath = filePath.replace(/\\/g, '/');
	return filePath;
}

export function getSnippetTemplateName(dirname: string, basename: string): string {
	if (dirname !== '.' && basename[0] === '_') {
		basename = basename.substring(1, basename.length);
	}
	return "\'" + path.join(dirname, basename).replace(constants.EngineTemplateFileExt, '').replace(/\\/g, '/') + "\'";
}

export  function getAllTemplatePaths(directory: string): string[] {
	const searchPattern = directory + `/**/*${constants.EngineTemplateFileExt}`;
	const files: string[] = glob.sync(searchPattern, {}).map(uri => path.relative(directory, uri).replace(/\\/g, '/'));
	return files;
}
