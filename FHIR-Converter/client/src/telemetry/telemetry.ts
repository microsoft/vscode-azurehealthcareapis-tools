/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import TelemetryReporter from 'vscode-extension-telemetry';
import vscode = require('vscode');

export let reporter: TelemetryReporter;

export class Reporter extends vscode.Disposable {
	constructor(ctx: vscode.ExtensionContext) {
		super(() => reporter.dispose());
		const packageInfo = getPackageInfo(ctx);
		reporter = packageInfo && new TelemetryReporter(packageInfo.name, packageInfo.version, packageInfo.aiKey);
	}
}

interface IPackageInfo {
	name: string;
	version: string;
	aiKey: string;
}

function getPackageInfo(context: vscode.ExtensionContext): IPackageInfo {
	const extensionPackage = require(context.asAbsolutePath('./package.json'));
	if (extensionPackage) {
		return { name: extensionPackage.name, version: extensionPackage.version, aiKey: extensionPackage.aiKey };
	}
	return;
}
