/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import * as glob from 'glob';
import * as Mocha from 'mocha';
import { join } from 'path';
import './test-hooks';

function setupCoverage() {
	const NYC = require('nyc');
	const nyc = new NYC({
		cwd: join(__dirname, '..', '..', '..'),
		exclude: ['**/test/**', '.vscode-test/**'],
		reporter: ['text', 'html', 'text-summary'],
		all: true,
		instrument: true,
		hookRequire: true,
		hookRunInContext: true,
		hookRunInThisContext: true,
	});

	nyc.reset();
	nyc.wrap();

	return nyc;
}

export async function run(): Promise<void> {
	const nyc = setupCoverage();

	const mochaOpts = {
		timeout: 10 * 1000,
		ui: 'tdd',
		...JSON.parse(process.env.PWA_TEST_OPTIONS || '{}'),
	};	

	const logTestReporter = join(__dirname, '../reporters/logTestReporter');

	mochaOpts.reporter = 'mocha-multi-reporters';
	mochaOpts.reporterOptions = {
	reporterEnabled: logTestReporter,
  };

	const runner = new Mocha(mochaOpts);

	runner.options.useColors = true;

	const options = { cwd: __dirname };
	const files = glob.sync('**/*utils.test.js', options);

	for (const file of files) {
		runner.addFile(join(__dirname, file));
	}

	try {
		await new Promise((resolve, reject) =>
			runner.run(failures =>
			failures ? reject(new Error(`${failures} tests failed`)) : resolve(),
			),
	);
	} finally {
		if (nyc) {
			nyc.writeCoverageFile();
			await nyc.report();
		}
	}
}
