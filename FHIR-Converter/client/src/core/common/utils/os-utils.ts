/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as os from 'os';

export function isWindows(): boolean {
	return os.platform() === 'win32';
}
