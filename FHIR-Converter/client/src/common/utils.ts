import * as fs from 'fs';
import * as path from 'path';
import localize from "../localize";
import { Status } from '../models/status.model';

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

export function wirtePrettyJson(filePath: string, json: object) {
	fs.writeFileSync(filePath, convertPrettyJsonString(json));
}

export function checkFolderWirtePrettyJson(fileName: string, msg: object) {
	checkCreateFolders(path.dirname(fileName));
	wirtePrettyJson(fileName, msg);
}

export function convertPrettyJsonString(json: object) {
	return JSON.stringify(json, null, 4);
}

export function generatePrettyFolderName(templateFolder: string) {
	return path.basename(templateFolder) + ' ' + localize("common.templateFolder.suffix");
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
	const str = `${localize("microsoft.health.fhir.converter.configuration.title")}: ${localize("common.data")} - ${dataName}, ${localize("common.template")} - ${templateName}`;
	return str;
}

export function getResultFileName(dataName: string, templateName: string) {
	return `${dataName} - ${templateName}.json`;
}






