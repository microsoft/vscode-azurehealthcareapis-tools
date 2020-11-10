import * as fs from 'fs';
import * as path from 'path';

export function checkCreateFolders(resultFolder: string) {
	if (!fs.existsSync(resultFolder)) {
		fs.mkdirSync(resultFolder, { recursive: true });
	}
}

export function checkFolderWritePrettyJson(fileName: string, msg: object) {
	checkCreateFolders(path.dirname(fileName));
	writePrettyJson(fileName, msg);
}

export function writePrettyJson(filePath: string, json: object) {
	fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
}
