/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export class ConversionError extends Error {
	constructor(msg) {
	super(msg);
	this.name = 'error.conversion';
	}
}
