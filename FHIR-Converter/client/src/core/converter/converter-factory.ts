/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import localize from '../../i18n/localize';
import * as configurationConstants from '../common/constants/workspace-configuration';
import * as stateConstants from '../common/constants/workspace-state';
import { Hl7v2FhirConverterEngine } from './engine/hl7v2-fhir-converter-engine';
import { ConverterType } from '../common/enum/converter-type';
import { Converter } from './converter';
import { ConversionError} from '../common/errors/conversion-error';
import { ConfigurationError } from '../common/errors/configuration-error';
import { globals } from '../globals';

export class ConverterEngineFactory {
	private static _instance = new ConverterEngineFactory();
	private constructor () {}

	static getInstance (): ConverterEngineFactory {
		return ConverterEngineFactory._instance;
	}

	createConverter() {
		// Check that the result folder is available
		const resultFolder = globals.settingManager.getWorkspaceConfiguration(configurationConstants.ResultFolderKey);
		if (!resultFolder) {
			throw new ConfigurationError(localize('message.noResultFolderProvided'));
		}

		let engine;
		const converterType = globals.settingManager.getWorkspaceConfiguration(configurationConstants.ConverterTypeKey);
		if (!converterType) {
			throw new ConfigurationError(localize('message.noConverterTypeProvided'));
		}

		if (converterType === ConverterType.hl7v2ToFhir) {
			// Check that the template folder is available
			const templateFolder: string = globals.settingManager.getWorkspaceConfiguration(configurationConstants.TemplateFolderKey);
			if (!templateFolder) {
				throw new ConfigurationError(localize('message.noTemplateFolderProvided'));
			}

			// Check that the entry template is available
			const rootTemplate = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
			if (!rootTemplate) {
				throw new ConversionError(localize('message.needSelectTemplate'));
			}

			// create the engine
			engine = new Hl7v2FhirConverterEngine(templateFolder, rootTemplate, resultFolder);
		} else {
			throw new ConversionError(localize('message.converterEngineNotSupported', converterType));
		}

		// create the converter
		return new Converter(engine, resultFolder);
	}
}
