/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as errorHandler from '../../../core/common/errors/error-handler';
import localize from '../../../i18n/localize';
import { converterWorkspaceExists } from '../workspace/converter-workspace-exists';
import { ConfigurationError } from '../../../core/common/errors/configuration-error';
import * as configurationConstants from '../../../core/common/constants/workspace-configuration';

export async function commandHandler(event) {
	try {
		// Check if converter workspace exists
		if (this.name !== 'createConverterWorkspaceCommand' && !converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
			throw new ConfigurationError(localize('message.needCreateWorkspace'));
		}
		// Execute the command
		await this(event);
	} catch (error) {
		// Handle the error
		errorHandler.handle(error);
	}
}
