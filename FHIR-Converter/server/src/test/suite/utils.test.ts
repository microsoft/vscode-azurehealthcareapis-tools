/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as utils from '../../common/utils';
import * as path from 'path';

suite('Utils Test Suite', () => {
	
	const testPath = path.join(__dirname, '../../../../test-data');

	test('Function addUnderlineExt - should return the fullname of snippet template with underline and extension', () => {
		const templateName = utils.addUnderlineExt('folder/snippet_template');
		assert.strictEqual(templateName, 'folder/_snippet_template.liquid');
	});

	test('Function addUnderlineExt - should return the fullname of snippet template with extension but without underline', () => {
		const templateName = utils.addUnderlineExt('snippet_template');
		assert.strictEqual(templateName, 'snippet_template.liquid');
	});

	test('Function getSnippetTemplateName - should return the path of snippet template for completion', () => {
		let completionString = utils.getSnippetTemplateName('Resource', '_Patient.liquid');
		assert.strictEqual(completionString, "\'Resource/Patient\'");
		completionString = utils.getSnippetTemplateName(path.join('Reference','Account'), '_Coverage_Coverage.liquid');
		assert.strictEqual(completionString, "\'Reference/Account/Coverage_Coverage\'");
	});

	test('Function getAllTemplatePaths - should return all the template paths', () => {
		const templateFolder = path.join(testPath, 'templates/Hl7v2');
		const completionString = utils.getAllTemplatePaths(templateFolder);
		assert.strictEqual(completionString.length, 837);
	});

});
