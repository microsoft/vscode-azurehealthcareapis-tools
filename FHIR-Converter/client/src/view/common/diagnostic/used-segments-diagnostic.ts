/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 */

import * as vscode from 'vscode';
import localize from '../../../i18n/localize';

export const diagnosticsCollection = vscode.languages.createDiagnosticCollection('vscode-health-fhir-converter.unusedSegments');

export function updateDiagnostics(uri: vscode.Uri, unusedSegments: object[]): void {
	const diagnostics: vscode.Diagnostic[] = [];
	const components = getComponentsList(unusedSegments);
	for (let i = 0; i < components['ranges'].length; i++) {
		diagnostics.push(createWarningDiagnostic(components['ranges'][i], components['values'][i]));
	}
	diagnosticsCollection.set(uri, diagnostics);
}

export function getComponentsList(unusedSegments: object[]): object {
	const result = { ranges: [], values: [] };
	if (!unusedSegments) {
		return result;
	}
	for (let i = 0; i < unusedSegments.length; i++) {
		const line = unusedSegments[i]['Line'];
		const components = unusedSegments[i]['Components'];
		if (line !== undefined && components !== undefined) {
			for (let j = 0; j < components.length; j++) {
				const start = components[j]['Start'];
				const end = components[j]['End'];
				const value = components[j]['Value'];
				if (start !== undefined && end !== undefined && value !== undefined) {
					result['ranges'].push(new vscode.Range(line, start, line, end));
					result['values'].push(value);
				}
			}
		}
	}
	return result;
}

export function createWarningDiagnostic(range: vscode.Range, value: string): vscode.Diagnostic {
	const diagnostic = new vscode.Diagnostic(range, localize('message.unusedSegment', value),
		vscode.DiagnosticSeverity.Warning);
	return diagnostic;
}

export function clearDiagnostics() {
	diagnosticsCollection.clear();
}
