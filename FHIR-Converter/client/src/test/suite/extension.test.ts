import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {

	test('should be activated normally', async () => {
		let extension = vscode.extensions.getExtension("microsoft.vscode-health-fhir-converter");
		if(extension){
			await extension.activate();
			assert.strictEqual(true, extension.isActive);
		}
	});
});
