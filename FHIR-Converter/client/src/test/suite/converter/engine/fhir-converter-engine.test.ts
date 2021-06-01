/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { FhirConverterEngine } from '../../../../core/converter/engine/fhir-converter-engine';
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
	const rootTemplate = 'ADT_A01.liquid';
	const invalidrootTemplate = 'Invalid_template';
	const hl7v2Engine = new FhirConverterEngine(templateFolder, rootTemplate, resultFolder);

	beforeEach(() => {
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
	});

	test('Function constructor - should return a engine', async () => {
		const engine = new FhirConverterEngine(templateFolder, rootTemplate, resultFolder);
		assert.strictEqual(engine instanceof FhirConverterEngine, true);
	});

	test('Function process - should return a json object with OK status given data, template and template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		hl7v2Engine.process(activeDataPath);
		assert.strictEqual(true, fs.existsSync(resultFile));
		const msg = JSON.parse(fs.readFileSync(resultFile).toString());
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);
	
	
	test('Function process - should throw an error given invalid data', async () => {
		try {
			hl7v2Engine.process(invalidActiveDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
	
	test('Function process - should throw an error given invalid entry template', async () => {
		try {
			const hl7v2EngineInvalidrootTemplate = new FhirConverterEngine(templateFolder, invalidrootTemplate, resultFolder);
			hl7v2EngineInvalidrootTemplate.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given invalid template folder', async () => {
		try {
			const hl7v2EngineInvalidTemplateFolder = new FhirConverterEngine(invalidTemplateFolder, rootTemplate, resultFolder);
			hl7v2EngineInvalidTemplateFolder.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given undefined data path', async () => {
		try {
			hl7v2Engine.process(undefined);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given empty data', async () => {
		try {
			hl7v2Engine.process(emptyDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
});

suite('CCDA Converter Engine Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../../../test-data');
	const resultFolder = path.join(testPath, 'result');
	const activeDataPath = path.join(testPath, 'data/C-CDA/CCD.ccda');
	const activeDataXmlPath = path.join(testPath, 'data/C-CDA/C-CDA_R2-1_CCD.xml');
	const invalidActiveDataPath = path.join(testPath, 'data/C-CDA/CCD-error.ccda');
	const emptyDataPath = path.join(testPath, 'data/C-CDA/empty.ccda');
	const templateFolder = path.join(testPath, 'templates/C-CDA');
	const invalidTemplateFolder = path.join(testPath, 'templates');
	const resultFile = path.join(resultFolder, 'temp.json');
	const rootTemplate = 'CCD.liquid';
	const invalidrootTemplate = 'Invalid_template';
	const ccdaEngine = new FhirConverterEngine(templateFolder, rootTemplate, resultFolder);

	beforeEach(() => {
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
	});

	test('Function constructor - should return a engine', async () => {
		const engine = new FhirConverterEngine(templateFolder, rootTemplate, resultFolder);
		assert.strictEqual(engine instanceof FhirConverterEngine, true);
	});

	test('Function process - should return a json object with OK status given data with .ccda, template and template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		ccdaEngine.process(activeDataPath);
		assert.strictEqual(true, fs.existsSync(resultFile));
		const msg = JSON.parse(fs.readFileSync(resultFile).toString());
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);
	
	test('Function process - should return a json object with OK status given data with .xml, template and template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		ccdaEngine.process(activeDataXmlPath);
		assert.strictEqual(true, fs.existsSync(resultFile));
		const msg = JSON.parse(fs.readFileSync(resultFile).toString());
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);
	
	test('Function process - should throw an error given invalid data', async () => {
		try {
			ccdaEngine.process(invalidActiveDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
	
	test('Function process - should throw an error given invalid entry template', async () => {
		try {
			const ccdaEngineInvalidrootTemplate = new FhirConverterEngine(templateFolder, invalidrootTemplate, resultFolder);
			ccdaEngineInvalidrootTemplate.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given invalid template folder', async () => {
		try {
			const ccdaEngineInvalidTemplateFolder = new FhirConverterEngine(invalidTemplateFolder, rootTemplate, resultFolder);
			ccdaEngineInvalidTemplateFolder.process(activeDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given undefined data path', async () => {
		try {
			ccdaEngine.process(undefined);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});

	test('Function process - should throw an error given empty data', async () => {
		try {
			ccdaEngine.process(emptyDataPath);
			assert.strictEqual(true, false);
		} catch (error) {
			assert.strictEqual(true, true);
		}
	});
});
