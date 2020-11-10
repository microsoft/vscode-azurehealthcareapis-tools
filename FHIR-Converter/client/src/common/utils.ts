import * as fs from 'fs';
import * as path from 'path';
import localize from '../localize';
import { Status } from '../models/status';

export function checkCreateFolders(resultFolder: string) {
	if (!fs.existsSync(resultFolder)) {
		fs.mkdirSync(resultFolder, { recursive: true });
	}
}

export function checkEngineStatus(msg: any) {
	return msg.Status === Status.OK;
}

export function getTemplateNameWithoutExt(templateName: string): string {
	return templateName.substring(0, templateName.lastIndexOf('.'));
}

export function writePrettyJson(filePath: string, json: object) {
	fs.writeFileSync(filePath, convertPrettyJsonString(json));
}

export function checkFolderWritePrettyJson(fileName: string, msg: object) {
	checkCreateFolders(path.dirname(fileName));
	writePrettyJson(fileName, msg);
}

export function convertPrettyJsonString(json: object) {
	return JSON.stringify(json, null, 4);
}

export function generatePrettyFolderName(templateFolder: string) {
	return path.basename(templateFolder) + ' ' + localize('common.templateFolder.suffix');
}

export function getStatusBarString(activeDataPath: string | undefined, activeTemplatePath: string | undefined) {
	let dataName = 'none';
	let templateName = 'none';
	if (activeDataPath) {
		dataName = path.basename(activeDataPath);
	}
	if (activeTemplatePath) {
		templateName = path.basename(activeTemplatePath);
	}
	const str = `${localize('microsoft.health.fhir.converter.configuration.title')}: ${localize('common.data')} - ${dataName}, ${localize('common.template')} - ${templateName}`;
	return str;
}

export function getResultFileName(dataPath: string, templatePath: string) {
	const dataName = path.basename(dataPath);
	const templateName = path.basename(templatePath);
	return `${dataName} - ${templateName}.json`;
}
