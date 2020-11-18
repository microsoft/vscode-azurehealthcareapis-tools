/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { Converter } from '../../../core/converter/converter';
import { Hl7v2FhirConverterEngine } from '../../../core/converter/engine/hl7v2-fhir-converter-engine';

suite('Converter Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../../test-data');
	const resultFolder = path.join(testPath, 'result');
	const historyFolder = path.join(testPath, 'history');
	const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
	const templateFolder = path.join(testPath, 'templates/Hl7v2');
	const entryTemplate = 'ADT_A01';
	const hl7v2Engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
	const converter = new Converter(hl7v2Engine, historyFolder);

	test('Function constructor - should return a converter given a engine and a result folder', async () => {
		const newConverter = new Converter(hl7v2Engine, resultFolder);
		assert.strictEqual(newConverter instanceof Converter, true);
	});

	test('Function get/set resultFolder - should get/set the parameter resultFolder correctly', async () => {
		const newConverter = new Converter(hl7v2Engine, resultFolder);
		const testFolder = 'D:/test';
		newConverter.resultFolder = testFolder;
		assert.strictEqual(newConverter.resultFolder, testFolder);
	});

	test('Function get/set engine - should get/set the parameter engine correctly', async () => {
		const newConverter = new Converter(hl7v2Engine, resultFolder);
		const newHl7v2Engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		newConverter.engine = newHl7v2Engine;
		assert.strictEqual(newConverter.engine, newHl7v2Engine);
	});

	test('Function convert - should return result file without errors given valid data', async () => {
		try {
			const file = converter.convert(activeDataPath);
			assert.strictEqual(file !== undefined, true);
		} catch (error) {
			assert.strictEqual(true, false);
		}
	}).timeout(20000);
	
	test('Function getHistory - should return a list of files given a file path', async () => {
	
			const filename = 'D:/ADT04-28 - ADT_A01.1605683976874.json';
			const expectedList = [
				path.join(historyFolder, 'ADT04-28 - ADT_A01.1605684048847.json').replace(/\\/g, '/'),
				path.join(historyFolder, 'ADT04-28 - ADT_A01.1605683993535.json').replace(/\\/g, '/'),
				path.join(historyFolder, 'ADT04-28 - ADT_A01.1605683976874.json').replace(/\\/g, '/'),
			];
			const list = converter.getHistory(filename);
			assert.deepStrictEqual(list, expectedList);
	});

	test('Function clearHistory - should clear historical files correctly', async () => {
	
		const createFiles = ['test.1.json', 'test.2.json', 'test.3.json'];
		for ( const fileId in createFiles) {
			fs.writeFileSync(path.join(historyFolder, createFiles[fileId]), 'test');
		}
		assert.strictEqual(converter.getHistory('test').length, 3);
		converter.clearHistory('test', 2, 1);
		assert.strictEqual(converter.getHistory('test').length, 1);
});
	
});
