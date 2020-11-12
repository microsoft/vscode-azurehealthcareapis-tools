import * as fs from 'fs';
import * as path from 'path';

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
