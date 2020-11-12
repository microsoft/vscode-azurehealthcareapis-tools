import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as fileUtils from '../../common/utils/file-utils';

suite('File Utils Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../test-data');
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

	const resultFolder = path.join(testPath, 'result');
	test('Function checkFolderWritePrettyJson - should write the pretty string to a file given a filename', () => {
		const targetFolder = path.join(resultFolder, 'frist/second');
		const filePath = path.join(targetFolder, 'test.json');
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
		}
		if (fs.existsSync(targetFolder)) {
			fs.rmdirSync(targetFolder);
		}
		assert.strictEqual(false, fs.existsSync(filePath));
		const exists = fileUtils.checkFolderWritePrettyJson(filePath, msgOk);
		assert.strictEqual(false, exists);
		assert.strictEqual(true, fs.existsSync(filePath));
		const obj = JSON.parse(fs.readFileSync(filePath).toString());
		assert.strictEqual('OK', obj.Status);
	});
	

	test('Function writePrettyJson - should write the pretty string from a json object to a file', () => {
		const filePath = path.join(resultFolder, 'test.json');
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
		const targetFolder = path.join(resultFolder, 'first/second');
		if (fs.existsSync(targetFolder)) {
			fs.rmdirSync(targetFolder);
		}
		const exists = fileUtils.checkCreateFolders(targetFolder);
		assert.strictEqual(false, exists);
		assert.strictEqual(true, fs.existsSync(targetFolder));
	});

	test('Function createFolders - should not create new folders when the folder exists', () => {
		const targetFolder = path.join(resultFolder, 'first/second');
		if (!fs.existsSync(targetFolder)) {
			fs.mkdirSync(resultFolder, { recursive: true });
		}
		const exists = fileUtils.checkCreateFolders(targetFolder);
		assert.strictEqual(true, exists);
	});


});
