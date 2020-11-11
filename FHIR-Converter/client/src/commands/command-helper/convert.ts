import * as vscode from 'vscode';
import * as path from 'path';
import * as utils from '../../common/utils/string-utils';
import { ConverterEngineOption } from '../../core/interface/converter-engine-option';
import * as interaction from '../../common/view/common-interaction-api';
import localize from '../../localize';
import { globals } from '../../init/globals';
import { ConversionError } from '../../common/errors/conversion-error';
import { ReminderError } from '../../common/errors/reminder-error';
import { TemplateFileExt } from '../../common/constants';
import * as constants from '../../common/constants';
import * as engineUtils from '../../common/utils/engine-utils';

export async function convert() {
	// Check whether there is any template not saved and ask if users want to save it
	const unsavedTemplates: vscode.TextDocument[] = interaction.getUnsavedFiles(TemplateFileExt);
	if (unsavedTemplates.length > 0) {
		await interaction.askSaveFiles(unsavedTemplates, localize('message.saveBeforeRefresh'), localize('message.save'), localize('message.ignore'));
	}

	// Check that both the data and template files are available 
	if (!globals.settingManager.activeDataPath) {
		throw new ReminderError(localize('message.needSelectData'));
	}
	if (!globals.settingManager.activeTemplatePath) {
		throw new ReminderError(localize('message.needSelectTemplate'));
	}

	// Check that the necessary configurations like result folder and template folder are available
	const resultFolder: string = globals.settingManager.getConfiguration(constants.ConfigurationResultFolderKey);
	if (!resultFolder) {
		throw new ConversionError(localize('message.noResultFolderProvided'));
	}

	const templateFolder: string = globals.settingManager.getConfiguration(constants.ConfigurationTemplateFolderKey);
	if (!templateFolder) {
		throw new ConversionError(localize('message.noTemplateFolderProvided'));
	}
	
	// Open the data and template in the editor
	await openShowFile(globals.settingManager.activeDataPath, globals.settingManager.activeTemplatePath);

	// Obtain the engine
	const engine = globals.converterEngineProvider.getEngine(globals.settingManager.getWorkspaceType());

	// Obtain the converter engine option
	const converterEngineOption: ConverterEngineOption = {
		data: (await vscode.workspace.openTextDocument(globals.settingManager.activeDataPath)).getText(),
		template: utils.getTemplateNameWithoutExt(path.basename(globals.settingManager.activeTemplatePath)),
		templateFolder: templateFolder,
		resultFile: path.join(resultFolder, constants.DefaultEngineResultFile)
	};

	// Execute the conversion process
	const msg = engine.process(converterEngineOption);
	if (!engineUtils.checkEngineStatus(msg)) {
		throw new ConversionError(msg.ErrorMessage);
	}

	return msg;
}

async function openShowFile(activeDataPath: string, activeTemplatePath: string) {
	await vscode.window.showTextDocument(vscode.Uri.file(activeDataPath), {
		viewColumn: vscode.ViewColumn.One
	});

	await vscode.window.showTextDocument(vscode.Uri.file(activeTemplatePath), {
		viewColumn: vscode.ViewColumn.Two,
	});
}
