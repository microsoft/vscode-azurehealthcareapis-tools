/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as vscode from 'vscode';
import localize from '../../../i18n/localize';
import { ConfigurationError } from '../errors/configuration-error';
import { ConversionError } from '../errors/conversion-error';

export function handle(error: Error): void {
	if (error instanceof ConfigurationError || error instanceof ConversionError) {
		vscode.window.showErrorMessage(localize(error.name, error.message));
	} else {
		vscode.window.showErrorMessage(localize('error.unexpected', error.message));
	}
}
