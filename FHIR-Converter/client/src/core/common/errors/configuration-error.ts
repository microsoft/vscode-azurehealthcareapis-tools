/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

export class ConfigurationError extends Error {
	constructor(msg) {
	super(msg);
	this.name = 'error.configuration';
	}
}
