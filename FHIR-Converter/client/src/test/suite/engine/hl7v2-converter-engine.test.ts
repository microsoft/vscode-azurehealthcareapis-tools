import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { DataType } from '../../../core/enum/data-type';
import { Hl7v2ConverterEngine } from '../../../core/converter-engine/hl7v2-converter-engine';
import { ConverterEngineOption } from '../../../core/interface/converter-engine-option';
import { DefaultHl7v2ExePath } from '../../../common/constants';
import { beforeEach } from 'mocha';

suite('Hl7v2 Converter Engine Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../../test-data');
	const resultFolder = path.join(testPath, 'result');
	const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
	const invalidActiveDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23-error.hl7');
	const templateFolder = path.join(testPath, 'templates/Hl7v2');
	const invalidTemplateFolder = path.join(testPath, 'templates');
	const resultFile = path.join(resultFolder, 'temp.json');
	const entryTemplate = 'ADT_A01';
	const invalidEntryTemplate = 'Invalid_template';
	const hl7v2Engine = new Hl7v2ConverterEngine(DataType.hl7v2);

	beforeEach(() => {
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
	});

	test('Function constructor - should return a engine with the default exe path without the parameter exePath', async () => {
		const Engine = new Hl7v2ConverterEngine(DataType.hl7v2);
		assert.strictEqual(DefaultHl7v2ExePath, Engine.exePath);
	});

	test('Function for property exePath - should return a engine with the custom exe path after setting exePath', async () => {
		const exePath = 'D:/test.exe';
		const Engine = new Hl7v2ConverterEngine(DataType.hl7v2);
		Engine.exePath = exePath;
		assert.strictEqual(exePath, Engine.exePath);
	});

	test('Function for property dataType - should return a engine with the custom data type after setting data type', async () => {
		const type = DataType.cda;
		const Engine = new Hl7v2ConverterEngine(DataType.hl7v2);
		Engine.type = type;
		assert.strictEqual(DataType.cda, Engine.type);
	});

	test('Function process - should return a json object with OK status given data, template and template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		const dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		const converterEngineOption: ConverterEngineOption = {
			data: dataDoc,
			template: entryTemplate,
			templateFolder: templateFolder,
			resultFile: resultFile
		};
		const msg = await hl7v2Engine.process(converterEngineOption);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);
	
	test('Function process - should return a json object with Fail status given invalid data', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		const dataDoc = (await vscode.workspace.openTextDocument(invalidActiveDataPath)).getText();
		const converterEngineOption: ConverterEngineOption = {
			data: dataDoc,
			template: entryTemplate,
			templateFolder: templateFolder,
			resultFile: resultFile
		};
		const msg = await hl7v2Engine.process(converterEngineOption);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});
	
	test('Function process - should return a json object with Fail status given invalid template', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		const dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		const converterEngineOption: ConverterEngineOption = {
			data: dataDoc,
			template: invalidEntryTemplate,
			templateFolder: templateFolder,
			resultFile: resultFile
		};
		const msg = await hl7v2Engine.process(converterEngineOption);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});
	
	test('Function process - should return a json object with Fail status given invalid template folder', async () => {
		assert.strictEqual(false, fs.existsSync(resultFile));
		const dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		const converterEngineOption: ConverterEngineOption = {
			data: dataDoc,
			template: entryTemplate,
			templateFolder: invalidTemplateFolder,
			resultFile: resultFile
		};
		const msg = await hl7v2Engine.process(converterEngineOption);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});
});
