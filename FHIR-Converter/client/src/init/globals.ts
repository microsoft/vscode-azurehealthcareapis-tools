import * as vscode from 'vscode';
import { ConverterHandler } from '../converter/converter-handler';

export module globals {
	export var activeTemplatePath: string;
	export var activeDataPath: string;
	export var context: vscode.ExtensionContext;
	export var coverterEngineHandler: ConverterHandler;
}
