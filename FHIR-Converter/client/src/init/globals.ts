import { ConverterEngineProvider } from '../core/converter-engine/converter-engine-provider';
import { SettingManager } from './settings';

export module globals {
	export let settingManager: SettingManager;
	export let converterEngineProvider: ConverterEngineProvider;
}
