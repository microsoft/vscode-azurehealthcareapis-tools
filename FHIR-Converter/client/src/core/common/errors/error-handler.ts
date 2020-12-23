/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import localize from '../../../i18n/localize';
import { ConfigurationError } from '../errors/configuration-error';
import { ConversionError } from '../errors/conversion-error';
import { TemplateManagementError } from '../errors/template-management-error';

export function handle(error: Error): void {
	let errorType = '';
	if (error instanceof ConfigurationError || error instanceof ConversionError || error instanceof TemplateManagementError) {
		errorType = error.name;
	} else {
		errorType = 'error.unexpected';
	}
	vscode.window.showErrorMessage(localize(errorType, error.message));
}
