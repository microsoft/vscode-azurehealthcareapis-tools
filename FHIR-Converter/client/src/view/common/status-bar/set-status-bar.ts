/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import localize from '../../../i18n/localize';
import * as vscode from 'vscode';
import * as stringUtils from '../../../core/common/utils/string-utils';
import * as stateConstants from '../../../core/common/constants/workspace-state';
import { globals } from '../../../core/globals';

export function setStatusBar() {
	// Get the active files
	let activeDataPath = globals.settingManager.getWorkspaceState(stateConstants.DataKey);
	let activeTemplatePath = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
	if (!activeDataPath) {
		activeDataPath = 'None';
	}
	if (!activeTemplatePath) {
		activeTemplatePath = 'None';
	}

	// Set the status bar according to the active files
	vscode.window.setStatusBarMessage(stringUtils.getStatusBarString(activeDataPath, activeTemplatePath,
		localize('microsoft.health.fhir.converter.configuration.title'), localize('common.data'), localize('common.template')));
}
