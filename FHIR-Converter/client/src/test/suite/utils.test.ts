import * as assert from 'assert';
import * as fs from 'fs';
import * as utils from '../../common/utils';
import * as path from 'path';
import * as vscode from 'vscode';

suite('Utils Test Suite', () => {
	const testPath = path.join(__dirname, '../../../../test-data');
	const msgOk = {
		Status: "OK",
		FhirResource: {
			"resourceType": "Bundle",
			"type": "transaction",
			"entry": [{
				"fullUrl": "uuid-sample",
				"resource": {
					"resourceType": "Patient"
				}
			}]
		}
	}

	const msgFail = {
		Status: "Fail",
		ErrorType: "System.FormatException",
		ErrorMessage: "Invalid Hl7 v2 message, first segment id = |^~"
	}

	const resultFolder = path.join(testPath, 'result');

	test('Function getTemplateNameWithoutExt - should return template name without extension', () => {
		let templateName = utils.getTemplateNameWithoutExt("ADT_A01.liquid");
		assert.strictEqual("ADT_A01", templateName);
	});

	test('Function checkEngineStatus - should return true when the status of response from engine is OK', () => {
		assert.strictEqual(true, utils.checkEngineStatus(msgOk));
	});

	test('Function checkEngineStatus - should return false when the status of response from engine is Fail', () => {
		assert.strictEqual(false, utils.checkEngineStatus(msgFail));
	});

	test('Function convertPrettyJsonString - should output the pretty string from a json object', () => {
		let prettyStr = utils.convertPrettyJsonString(msgOk);
		assert.strictEqual(JSON.stringify(msgOk, null, 4), prettyStr);
	});

	test('Function generatePrettyFolderName - should append the string \'(Templates)\' to the template folder name at the exploerer view', () => {
		let prettyFolderName = utils.generatePrettyFolderName('Hl7v2');
		assert.strictEqual('Hl7v2 (Templates)', prettyFolderName);
	});

	test('Function wirtePrettyJson - should write the pretty string from a json object to a file', () => {
		let filePath = path.join(resultFolder, 'test.json');
		if(fs.existsSync(filePath)){
			fs.unlinkSync(filePath);
		}
		assert.strictEqual(false, fs.existsSync(filePath));
		utils.wirtePrettyJson(filePath, msgOk)
		assert.strictEqual(true, fs.existsSync(filePath));
		let obj = JSON.parse(fs.readFileSync(filePath).toString());
		assert.strictEqual('OK', obj.Status);
	});

	test('Function getStatusBarString - should return a string which contains template name, but without data name', () => {
		let str = utils.getStatusBarString(undefined, 'myTemplateFile');
		assert.strictEqual("FHIR Converter: data - none, template - myTemplateFile", str);
	});

	test('Function getStatusBarString - should return a string which contains the data name, but without template name', () => {
		let str = utils.getStatusBarString('myDataFile', undefined);
		assert.strictEqual("FHIR Converter: data - myDataFile, template - none", str);
	});

	test('Function getStatusBarString - should return a string which contains both template name and data name', () => {
		let str = utils.getStatusBarString('myDataFile','myTemplateFile');
		assert.strictEqual("FHIR Converter: data - myDataFile, template - myTemplateFile", str);
	});

	test('Function convert - should return a json object with OK status given data, template and template folder', async () => {
		let activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		let templateFolder = path.join(testPath, 'templates/Hl7v2');
		let resultFile = path.join(resultFolder, 'temp.json');
		let entryTemplate = 'ADT_A01';
		if(fs.existsSync(resultFile)){
			fs.unlinkSync(resultFile);
		}
		assert.strictEqual(false, fs.existsSync(resultFile));
		let dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		let msg = await utils.convert(dataDoc, entryTemplate, templateFolder, resultFolder);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('OK', msg.Status);
	}).timeout(20000);

	test('Function convert - should return a json object with Fail status given invalid data', async () => {
		let activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23-error.hl7');
		let templateFolder = path.join(testPath, 'templates/Hl7v2');
		let resultFile = path.join(resultFolder, 'temp.json');
		let entryTemplate = 'ADT_A01';
		if(fs.existsSync(resultFile)){
			fs.unlinkSync(resultFile);
		}
		assert.strictEqual(false, fs.existsSync(resultFile));
		let dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		let msg = await utils.convert(dataDoc, entryTemplate, templateFolder, resultFolder);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});

	test('Function convert - should return a json object with Fail status given invalid template', async () => {
		let activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		let templateFolder = path.join(testPath, 'templates/Hl7v2');
		let resultFile = path.join(resultFolder, 'temp.json');
		let entryTemplate = 'ADT_A01_Error';
		if(fs.existsSync(resultFile)){
			fs.unlinkSync(resultFile);
		}
		assert.strictEqual(false, fs.existsSync(resultFile));
		let dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		let msg = await utils.convert(dataDoc, entryTemplate, templateFolder, resultFolder);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});

	test('Function convert - should return a json object with Fail status given invalid template folder', async () => {
		let activeDataPath = path.join(testPath, 'data/Hl7v2/ADT01-23.hl7');
		let templateFolder = path.join(testPath, 'templates');
		let resultFile = path.join(resultFolder, 'temp.json');
		let entryTemplate = 'ADT_A01';
		if(fs.existsSync(resultFile)){
			fs.unlinkSync(resultFile);
		}
		assert.strictEqual(false, fs.existsSync(resultFile));
		let dataDoc = (await vscode.workspace.openTextDocument(activeDataPath)).getText();
		let msg = await utils.convert(dataDoc, entryTemplate, templateFolder, resultFolder);
		assert.strictEqual(true, fs.existsSync(resultFile));
		assert.strictEqual('Fail', msg.Status);
	});

	test('Function createFolders - should can create recursive folders', () => {
		let targetFolders = path.join(resultFolder, 'frist/second');
		if(fs.existsSync(targetFolders)){
			fs.rmdirSync(targetFolders);
		}
		utils.createFolders(targetFolders);
		assert.strictEqual(true, fs.existsSync(targetFolders));
	});


});
