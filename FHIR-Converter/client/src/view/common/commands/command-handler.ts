/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as errorHandler from '../../../core/common/errors/error-handler';
import localize from '../../../i18n/localize';
import { converterWorkspaceExists } from '../workspace/converter-workspace-exists';
import { ConversionError } from '../../../core/common/errors/conversion-error';
import { ConfigurationError } from '../../../core/common/errors/configuration-error';
import * as configurationConstants from '../../../core/common/constants/workspace-configuration';
import { reporter } from '../../../telemetry/telemetry';
import * as osUtils from '../../../core/common/utils/os-utils';

export async function commandHandler(event) {
	try {
		// Check if the operating system is supported.
		if (!osUtils.isWindows()) {
			throw new ConversionError(localize('message.osNotSupported'));
		}

		// Check if converter workspace exists
		if (this.name !== 'createConverterWorkspaceCommand' && !converterWorkspaceExists(configurationConstants.WorkspaceFileExtension)) {
			throw new ConfigurationError(localize('message.needCreateWorkspace'));
		}

		// Execute the command
		const startTime = new Date().getTime()
		await this(event);
		const costTime = (new Date().getTime() - startTime)
		
		// Telemetry for commands
		reporter.sendTelemetryEvent('command', { command: this.name }, { costTime: costTime } );

	} catch (error) {
		// Handle the error
		errorHandler.handle(error);
	}
}
