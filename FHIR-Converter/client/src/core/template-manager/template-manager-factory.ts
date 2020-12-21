/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import { AcrTemplateManager } from './acr-template-manager';

export class TemplateManagerFactory {
	private static _instance = new TemplateManagerFactory();
	private constructor() {}

	static getInstance(): TemplateManagerFactory {
		return TemplateManagerFactory._instance;
	}

	createTemplateManager() {
		// Create ACR template manager
		return new AcrTemplateManager();
	}
}
