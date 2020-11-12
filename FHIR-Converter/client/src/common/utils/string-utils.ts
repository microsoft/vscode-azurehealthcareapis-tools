import * as path from 'path';

export function getTemplateNameWithoutExt(templateName: string): string {
	return templateName.substring(0, templateName.lastIndexOf('.'));
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

export function getResultFileName(dataPath: string, templatePath: string) {
	const dataName = path.basename(dataPath);
	const templateName = path.basename(templatePath);
	return `${dataName} - ${templateName}.json`;
}
