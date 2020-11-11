import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { DataType } from '../../core/enum/data-type';
import { ConverterEngineFactory } from '../../core/converter-engine/converter-engine-factory';
import { ConverterEngineOption } from '../../core/interface/converter-engine-option';
import * as engineUtils from '../../common/utils/engine-utils';

suite('Engine Utils Test Suite', () => {
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

	const msgFail = {
		Status: 'Fail',
		ErrorType: 'System.FormatException',
		ErrorMessage: 'Invalid Hl7 v2 message, first segment id = |^~'
	};

	const resultFolder = path.join(testPath, 'result');

	const hl7v2Engine = new ConverterEngineFactory().getEngine(DataType.hl7v2);

	test('Function checkEngineStatus - should return true when the status of response from engine is OK', () => {
		assert.strictEqual(true, engineUtils.checkEngineStatus(msgOk));
	});

	test('Function checkEngineStatus - should return false when the status of response from engine is Fail', () => {
		assert.strictEqual(false, engineUtils.checkEngineStatus(msgFail));
	});

	test('Function convert - should return a json object with OK status given data, template and template folder', async () => {
		const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		const templateFolder = path.join(testPath, 'templates/Hl7v2');
		const resultFile = path.join(resultFolder, 'temp.json');
		const entryTemplate = 'ADT_A01';
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
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

	test('Function convert - should return a json object with Fail status given invalid data', async () => {
		const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23-error.hl7');
		const templateFolder = path.join(testPath, 'templates/Hl7v2');
		const resultFile = path.join(resultFolder, 'temp.json');
		const entryTemplate = 'ADT_A01';
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
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
		assert.strictEqual('Fail', msg.Status);
	});

	test('Function convert - should return a json object with Fail status given invalid template', async () => {
		const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		const templateFolder = path.join(testPath, 'templates/Hl7v2');
		const resultFile = path.join(resultFolder, 'temp.json');
		const entryTemplate = 'ADT_A01_Error';
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
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
		assert.strictEqual('Fail', msg.Status);
	});

	test('Function convert - should return a json object with Fail status given invalid template folder', async () => {
		const activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		const templateFolder = path.join(testPath, 'templates');
		const resultFile = path.join(resultFolder, 'temp.json');
		const entryTemplate = 'ADT_A01';
		if (fs.existsSync(resultFile)) {
			fs.unlinkSync(resultFile);
		}
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
		assert.strictEqual('Fail', msg.Status);
	});
});
