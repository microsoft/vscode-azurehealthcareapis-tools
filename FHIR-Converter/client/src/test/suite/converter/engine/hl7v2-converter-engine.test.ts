/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { Hl7v2FhirConverterEngine } from '../../../../core/converter/engine/hl7v2-fhir-converter-engine';
import { DefaultHl7v2ExePath } from '../../../../core/common/constants/engine';
import { beforeEach } from 'mocha';

suite('Hl7v2 Converter Engine Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../../../test-data');
	const resultFolder = path.join(testPath, 'result');
	const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
	const invalidActiveDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23-error.hl7');
	const emptyDataPath = path.join(testPath, 'data/Hl7v2/empty.hl7');
	const templateFolder = path.join(testPath, 'templates/Hl7v2');
	const invalidTemplateFolder = path.join(testPath, 'templates');
	const resultFile = path.join(resultFolder, 'temp.json');
	const entryTemplate = 'ADT_A01.liquid';
	const invalidEntryTemplate = 'Invalid_template';
	const hl7v2Engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);

	beforeEach(() => {
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
	});

	test('Function constructor - should return a engine with the default exe path without the parameter exePath', async () => {
		const engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		assert.strictEqual(DefaultHl7v2ExePath, engine.exePath);
	});

	test('Function get/set exePath - should get/set the parameter exePath correctly', async () => {
		const engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		const exePath = 'D:/test.exe';
		engine.exePath = exePath;
		assert.strictEqual(engine.exePath, exePath);
	});

	test('Function get/set templateFolder - should get/set the parameter templateFolder correctly', async () => {
		const engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		const testFolder = 'D:/test';
		engine.templateFolder = testFolder;
		assert.strictEqual(engine.templateFolder, testFolder);
	});

	test('Function get/set resultFolder - should get/set the parameter resultFolder correctly', async () => {
		const engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		const testFolder = 'D:/test';
		engine.resultFolder = testFolder;
		assert.strictEqual(engine.resultFolder, testFolder);
	});

	test('Function get/set entryTemplate - should get/set the parameter entryTemplate correctly', async () => {
		const engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		const file = 'test.liquid';
		engine.entryTemplate = file;
		assert.strictEqual(engine.entryTemplate, file);
	});

	test('Function process - should return a json object with OK status given data, template and template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		hl7v2Engine.process(activeDataPath);
		assert.strictEqual(true, fs.existsSync(resultFile));
		const msg = JSON.parse(fs.readFileSync(resultFile).toString());
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);
	
	
	test('Function process - should return a json object with Fail status given invalid data', async () => {
		try {
			hl7v2Engine.process(invalidActiveDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
	
	test('Function process - should throw a error given invalid entry template', async () => {
		try {
			const hl7v2EngineInvalidEntryTemplate = new Hl7v2FhirConverterEngine(templateFolder, invalidEntryTemplate, resultFolder);
			hl7v2EngineInvalidEntryTemplate.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw a error given invalid template folder', async () => {
		try {
			const hl7v2EngineInvalidTemplateFolder = new Hl7v2FhirConverterEngine(invalidTemplateFolder, invalidEntryTemplate, resultFolder);
			hl7v2EngineInvalidTemplateFolder.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw a error given undefined data path', async () => {
		try {
			hl7v2Engine.process(undefined);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw a error given empty data', async () => {
		try {
			hl7v2Engine.process(emptyDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
});
