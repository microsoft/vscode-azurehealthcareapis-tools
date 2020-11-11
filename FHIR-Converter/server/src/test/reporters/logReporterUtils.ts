/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as os from 'os';
import * as mocha from 'mocha';
import * as path from 'path';

export interface TestWithLogfile extends mocha.Test {
  logPath?: string;
}

export function getLogFileForTest(testTitlePath: string) {
  return path.join(os.tmpdir(), `${testTitlePath.replace(/[^a-z0-9]/gi, '-')}.json`);
}
