import * as path from 'path';
import * as glob from 'glob';

export function addUnderlineExt(filePath: string){
	filePath = path.join(path.dirname(filePath), '_' + path.basename(filePath) + '.liquid')
	filePath = filePath.replace(/\\/g,'/');
	return filePath;
}

export function getSnippetTemplateName(dirname: string, basename: string): string {
	return "\'" + path.join(dirname, basename.substring(1, basename.length)).replace('.liquid', '').replace(/\\/g, '/') + "\'";
}

export  function getAllTemplatePaths(directory: string): string[] {
	const searchPattern = directory + '/**/*.liquid';
	const files: string[] = glob.sync(searchPattern, {}).map(uri => path.relative(directory, uri).replace(/\\/g,'/'));
	return files;
}