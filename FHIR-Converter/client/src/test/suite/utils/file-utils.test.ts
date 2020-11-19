/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as fileUtils from '../../../core/common/utils/file-utils';

suite('File Utils Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../../test-data');
	const multiLayerFolder = path.join(testPath, 'result/first-dir/second-dir');
	const msgOk = {
		Status: 'OK',
		FhirResource: {
			'resourceType': 'Bundle',
			'type': 'transaction',
			'entry': [{
				'fullUrl': 'uuid-sample',
				'resource': {
					'resourceType': 'Patient'
				}
			}]
		}
	};

	
	test('Function checkFolderWritePrettyJson - should write the pretty string to a file given a filename', () => {
		const filePath = path.join(multiLayerFolder, 'test.json');
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
		if (fs.existsSync(multiLayerFolder)) {
			fs.rmdirSync(multiLayerFolder);
		}
		assert.strictEqual(fs.existsSync(filePath), false);
		const exists = fileUtils.writeJsonToFile(filePath, msgOk);
		assert.strictEqual(exists, false);
		assert.strictEqual(fs.existsSync(filePath), true);
		const obj = JSON.parse(fs.readFileSync(filePath).toString());
		assert.strictEqual(obj.Status, 'OK');
	});

	test('Function createFolders - should create recursive folders when the folder do not exist', () => {
		if (fs.existsSync(multiLayerFolder)) {
			fs.rmdirSync(multiLayerFolder, { recursive: true });
		}
		const exists = fileUtils.checkCreateFolders(multiLayerFolder);
		assert.strictEqual(exists, false);
		assert.strictEqual(fs.existsSync(multiLayerFolder), true);
	});

	test('Function createFolders - should not create new folders when the folder exists', () => {
		if (!fs.existsSync(multiLayerFolder)) {
			fs.mkdirSync(multiLayerFolder, { recursive: true });
		}
		const exists = fileUtils.checkCreateFolders(multiLayerFolder);
		assert.strictEqual(exists, true);
	});

	test('Function getAllPaths - should return all file paths according to the pattern', () => {
		const templateFolder = path.join(testPath, './templates/Hl7v2');
		const files = fileUtils.getAllPaths(templateFolder, '/**/O*.liquid');
		assert.strictEqual(files.length, 2);
	});
});

