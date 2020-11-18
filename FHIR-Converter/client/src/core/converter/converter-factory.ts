/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import localize from '../../i18n/localize';
import * as configurationConstants from '../common/constants/workspace-configuration';
import * as stateConstants from '../common/constants/workspace-state';
import { Hl7v2FhirConverterEngine } from './engine/hl7v2-fhir-converter-engine';
import { ConverterType } from '../common/enum/converter-type';
import { Converter } from './converter';
import { ConversionError} from '../common/errors/conversion-error';
import { globals } from '../globals';

export class ConverterEngineFactory {
	private static instance = new ConverterEngineFactory();
	private constructor () {}

	static getInstance (): ConverterEngineFactory {
		return ConverterEngineFactory.instance;
	}

	createConverter() {
		// Check that the result folder is available
		const resultFolder = globals.settingManager.getWorkspaceConfiguration(configurationConstants.ResultFolderKey);
		if (!resultFolder) {
			throw new ConversionError(localize('message.noResultFolderProvided'));
		}

		let engine;
		const converterType = globals.settingManager.getWorkspaceConfiguration(configurationConstants.ConverterTypeKey);
		if (converterType === ConverterType.hl7v2ToFhir) {
			// Check that the template folder is available
			const templateFolder: string = globals.settingManager.getWorkspaceConfiguration(configurationConstants.TemplateFolderKey);
			if (!templateFolder) {
				throw new ConversionError(localize('message.noTemplateFolderProvided'));
			}

			// Check that the entry template is available
			const entryTemplate = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
			if (!entryTemplate) {
				throw new ConversionError(localize('message.needSelectTemplate'));
			}

			// create the engine
			engine = new Hl7v2FhirConverterEngine(templateFolder, entryTemplate, resultFolder);
		} else {
			throw new ConversionError(localize('message.converterEngineNotSupported', converterType));
		}

		// create the converter
		return new Converter(engine, resultFolder);
	}
}
