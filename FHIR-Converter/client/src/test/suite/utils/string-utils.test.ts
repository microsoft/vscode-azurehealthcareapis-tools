import * as assert from 'assert';
import * as stringUtils from '../../../core/common/utils/string-utils';

suite('String Utils Test Suite', () => {
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

	test('Function getTemplateNameWithoutExt - should return template name without extension', () => {
		const templateName = stringUtils.getFileNameWithoutExt('D:/ADT_A01.liquid');
		assert.strictEqual(templateName, 'ADT_A01');
	});

	test('Function convertPrettyJsonString - should output the pretty string from a json object', () => {
		const prettyStr = stringUtils.convertPrettyJsonString(msgOk);
		assert.strictEqual(prettyStr, JSON.stringify(msgOk, null, 4));
	});

	test('Function generatePrettyFolderName - should append the string \'(Templates)\' to the template folder name at the exploerer view', () => {
		const prettyFolderName = stringUtils.generatePrettyFolderName('Hl7v2', '(Templates)');
		assert.strictEqual(prettyFolderName, 'Hl7v2 (Templates)');
	});

	test('Function getStatusBarString - should return a string which contains template name, but without data name', () => {
		const str = stringUtils.getStatusBarString(undefined, 'myTemplateFile', 'FHIR Converter', 'data', 'template');
		assert.strictEqual(str, 'FHIR Converter: data - none, template - myTemplateFile');
	});

	test('Function getStatusBarString - should return a string which contains the data name, but without template name', () => {
		const str = stringUtils.getStatusBarString('myDataFile', undefined, 'FHIR Converter', 'data', 'template');
		assert.strictEqual(str, 'FHIR Converter: data - myDataFile, template - none');
	});

	test('Function getStatusBarString - should return a string which contains both template name and data name', () => {
		const str = stringUtils.getStatusBarString('myDataFile', 'myTemplateFile', 'FHIR Converter', 'data', 'template');
		assert.strictEqual(str, 'FHIR Converter: data - myDataFile, template - myTemplateFile');
	});

	test('Function getResultFileName - should return file name with data filename and template filename', () => {
		const templateFile = 'ADT_A01.liquid';
		const dataFile = 'ADT01-23.hl7';
		assert.strictEqual(stringUtils.getResultFileName(dataFile, templateFile, '1605619149025'), 'ADT01-23 - ADT_A01.1605619149025.json');
	});

	test('Function getDescendingSortString - should return a sorted string with descending order', () => {
		const list = ['result.1234.json', 'result.5852.json', 'result.2234.json', 'result.4683.json'];
		const expectedList = ['result.5852.json', 'result.4683.json', 'result.2234.json', 'result.1234.json'];
		const actualList = stringUtils.getDescendingSortString(list);
		assert.deepStrictEqual(actualList, expectedList);
	});

	
});
