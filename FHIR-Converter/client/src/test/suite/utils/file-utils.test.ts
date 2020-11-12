import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as fileUtils from '../../../common/utils/file-utils';

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
		assert.strictEqual(false, fs.existsSync(filePath));
		const exists = fileUtils.checkFolderWritePrettyJson(filePath, msgOk);
		assert.strictEqual(false, exists);
		assert.strictEqual(true, fs.existsSync(filePath));
		const obj = JSON.parse(fs.readFileSync(filePath).toString());
		assert.strictEqual('OK', obj.Status);
	});
	

	test('Function writePrettyJson - should write the pretty string from a json object to a file', () => {
		const filePath = path.join(multiLayerFolder, 'test.json');
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
		assert.strictEqual(false, fs.existsSync(filePath));
		fileUtils.writePrettyJson(filePath, msgOk);
		assert.strictEqual(true, fs.existsSync(filePath));
		const obj = JSON.parse(fs.readFileSync(filePath).toString());
		assert.strictEqual('OK', obj.Status);
	});

	test('Function createFolders - should create recursive folders when the folder do not exist', () => {
		if (fs.existsSync(multiLayerFolder)) {
			fs.rmdirSync(multiLayerFolder, { recursive: true });
		}
		const exists = fileUtils.checkCreateFolders(multiLayerFolder);
		assert.strictEqual(false, exists);
		assert.strictEqual(true, fs.existsSync(multiLayerFolder));
	});

	test('Function createFolders - should not create new folders when the folder exists', () => {
		if (!fs.existsSync(multiLayerFolder)) {
			fs.mkdirSync(multiLayerFolder, { recursive: true });
		}
		const exists = fileUtils.checkCreateFolders(multiLayerFolder);
		assert.strictEqual(true, exists);
	});


});
