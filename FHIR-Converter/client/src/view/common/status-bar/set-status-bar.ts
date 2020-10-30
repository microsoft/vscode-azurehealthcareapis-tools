/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

import localize from '../../../i18n/localize';
import * as vscode from 'vscode';
import * as stringUtils from '../../../core/common/utils/string-utils';
import * as stateConstants from '../../../core/common/constants/workspace-state';
import { globals } from '../../../core/globals';

export function setStatusBar() {
	// Get the active files
	const activeDataPath = globals.settingManager.getWorkspaceState(stateConstants.DataKey);
	const activeTemplatePath = globals.settingManager.getWorkspaceState(stateConstants.TemplateKey);
	
	// Set the status bar according to the active files
	return vscode.window.setStatusBarMessage(stringUtils.getStatusBarString(activeDataPath, activeTemplatePath,
		localize('microsoft.health.fhir.converter.configuration.title'), localize('common.data'), localize('common.template')));
}
