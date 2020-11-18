/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {

	test('should be activated normally', async () => {
		const extension = vscode.extensions.getExtension('microsoft.vscode-health-fhir-converter');
		if (extension) {
			await extension.activate();
			assert.strictEqual(true, extension.isActive);
		}
	});
});
