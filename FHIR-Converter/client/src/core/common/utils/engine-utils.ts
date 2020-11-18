/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import { Status } from '../enum/status';

export function checkEngineStatus(msg: any) {
	return msg.Status === Status.OK;
}
