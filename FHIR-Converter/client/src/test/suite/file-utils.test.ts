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

	test('Function createFolders - should can create recursive folders', () => {
		const targetFolders = path.join(resultFolder, 'frist/second');
		if (fs.existsSync(targetFolders)) {
			fs.rmdirSync(targetFolders);
		}
		fileUtils.checkCreateFolders(targetFolders);
		assert.strictEqual(true, fs.existsSync(targetFolders));
	});

});
