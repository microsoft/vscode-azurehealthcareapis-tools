/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License in the project root for license information.
 */

export interface ITemplateManager {
	login(registryName: string): string;
	logout(registryName: string): string;
	pullTemplates(imageReference: string, outputFolder: string, force: boolean): string;
	pushTemplates(imageReference: string, inputFolder: string): string;
}
