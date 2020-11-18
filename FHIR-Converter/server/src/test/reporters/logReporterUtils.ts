/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as os from 'os';
import * as mocha from 'mocha';
import * as path from 'path';

export interface TestWithLogfile extends mocha.Test {
  logPath?: string;
}

export function getLogFileForTest(testTitlePath: string) {
  return path.join(os.tmpdir(), `${testTitlePath.replace(/[^a-z0-9]/gi, '-')}.json`);
}
