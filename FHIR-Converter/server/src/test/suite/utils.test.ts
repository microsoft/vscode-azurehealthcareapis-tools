import * as assert from 'assert';
import * as utils from '../../common/utils';
import * as path from 'path';

suite('Utils Test Suite', () => {
	
	const testPath = path.join(__dirname, '../../../../test-data');

	test('Function addUnderlineExt - should return the fullname of snippet template with underline and extension', () => {
		let templateName = utils.addUnderlineExt("snippet_template");
		assert.strictEqual("_snippet_template.liquid", templateName);
	});

	test('Function getSnippetTemplateName - should return the path of snippet template for completion', () => {
		let completionString = utils.getSnippetTemplateName(".\\Resource", "_Patient.liquid");
		assert.strictEqual("\'Resource/Patient\'", completionString);
		completionString = utils.getSnippetTemplateName(".\\Reference\\Account", "_Coverage_Coverage.liquid");
		assert.strictEqual("\'Reference/Account/Coverage_Coverage\'", completionString);
	});

	test('Function getAllTemplatePaths - should return all the template paths', () => {
		let templateFolder = path.join(testPath, 'templates/Hl7v2')
		let completionString = utils.getAllTemplatePaths(templateFolder);
		assert.strictEqual(816, completionString.length);
	});

});
