import * as vscode from 'vscode';
import { ConverterHandler } from '../converter/converter-handler';

export module globals {
	export let activeTemplatePath: string;
	export let activeDataPath: string;
	export let context: vscode.ExtensionContext;
	export let converterEngineHandler: ConverterHandler;
}
