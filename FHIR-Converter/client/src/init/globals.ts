import { ConverterEngineFactory } from '../core/converter-engine/converter-engine-factory';
import { SettingManager } from './settings';

export module globals {
	export let settingManager: SettingManager;
	export let converterEngineFactory: ConverterEngineFactory;
}
