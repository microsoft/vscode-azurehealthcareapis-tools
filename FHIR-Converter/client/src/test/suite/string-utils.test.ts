import * as assert from 'assert';
import * as stringUtils from '../../common/utils/string-utils';

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
		const templateName = stringUtils.getTemplateNameWithoutExt('ADT_A01.liquid');
		assert.strictEqual('ADT_A01', templateName);
	});

	test('Function convertPrettyJsonString - should output the pretty string from a json object', () => {
		const prettyStr = stringUtils.convertPrettyJsonString(msgOk);
		assert.strictEqual(JSON.stringify(msgOk, null, 4), prettyStr);
	});

	test('Function generatePrettyFolderName - should append the string \'(Templates)\' to the template folder name at the exploerer view', () => {
		const prettyFolderName = stringUtils.generatePrettyFolderName('Hl7v2');
		assert.strictEqual('Hl7v2 (Templates)', prettyFolderName);
	});

	test('Function getStatusBarString - should return a string which contains template name, but without data name', () => {
		const str = stringUtils.getStatusBarString(undefined, 'myTemplateFile');
		assert.strictEqual('FHIR Converter: data - none, template - myTemplateFile', str);
	});

	test('Function getStatusBarString - should return a string which contains the data name, but without template name', () => {
		const str = stringUtils.getStatusBarString('myDataFile', undefined);
		assert.strictEqual('FHIR Converter: data - myDataFile, template - none', str);
	});

	test('Function getStatusBarString - should return a string which contains both template name and data name', () => {
		const str = stringUtils.getStatusBarString('myDataFile', 'myTemplateFile');
		assert.strictEqual('FHIR Converter: data - myDataFile, template - myTemplateFile', str);
	});

	test('Function getResultFileName - should return file name with data filename and template filename', () => {
		const templateFile = 'ADT_A01.liquid';
		const dataFile = 'ADT01-23.hl7';
		assert.strictEqual('ADT01-23.hl7 - ADT_A01.liquid.json', stringUtils.getResultFileName(dataFile, templateFile));
	});
});
