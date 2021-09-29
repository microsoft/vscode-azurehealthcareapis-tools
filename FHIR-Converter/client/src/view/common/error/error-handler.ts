/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import * as configurationConstants from '../../../core/common/constants/workspace-configuration';
import * as interaction from '../../common/file-dialog/file-dialog-interaction';
import localize from '../../../i18n/localize';
import { ConfigurationError } from '../../../core/common/errors/configuration-error';
import { ConversionError } from '../../../core/common/errors/conversion-error';
import { TemplateManagementError } from '../../../core/common/errors/template-management-error';
import { globals } from '../../../core/globals';

export async function handle(error: Error): Promise<void> {
	let errorType = 'error.unexpected';
	if (error instanceof ConfigurationError || error instanceof ConversionError || error instanceof TemplateManagementError) {
		errorType = error.name;
	}

	// Handle the error using text pattern due to the lack of error code from engine tool
	if (error.message.includes('Could not find metadata.json in template directory')) {
		const templateFolder: string = globals.settingManager.getWorkspaceConfiguration(configurationConstants.TemplateFolderKey);
		await interaction.askCreateMetadata(localize(errorType, localize('message.noMetadata', templateFolder)), localize('message.createMetadata'), templateFolder)
	} else {
		vscode.window.showErrorMessage(localize(errorType, error.message));
	}
}
