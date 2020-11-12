import { ConverterEngineFactory } from '../../../core/converter-engine/converter-engine-factory';
import * as assert from 'assert';
import { DataType } from '../../../core/enum/data-type';
import { Hl7v2ConverterEngine } from '../../../core/converter-engine/hl7v2-converter-engine';

suite('Converter Engine Factory Test Suite', () => {

	test('Function getEngine - should return the same instance using the singleton pattern', async () => {
		const converterEngineFactory = new ConverterEngineFactory();
		const Hl7v2Engine1 = converterEngineFactory.getEngine(DataType.hl7v2);
		const Hl7v2Engine2 = converterEngineFactory.getEngine(DataType.hl7v2);
		assert.strictEqual(Hl7v2Engine1, Hl7v2Engine2);
	});

	test('Function getEngine - should return a engine with the given data type', async () => {
		const Hl7v2Engine = new ConverterEngineFactory().getEngine(DataType.hl7v2);
		assert.strictEqual(true, Hl7v2Engine instanceof Hl7v2ConverterEngine);
		assert.strictEqual(DataType.hl7v2, Hl7v2Engine.type);
	});

	test('Function getEngine - should return undefined given unsupported data type', async () => {
		const cdaEngine = new ConverterEngineFactory().getEngine(DataType.cda);
		assert.strictEqual(undefined, cdaEngine);
	});

	test('Function getEngine - should return a new engine given another data type', async () => {
		const converterEngineFactory = new ConverterEngineFactory();
		const Hl7v2Engine = converterEngineFactory.getEngine(DataType.hl7v2);
		assert.strictEqual(DataType.hl7v2, Hl7v2Engine.type);
		const cdaEngine = converterEngineFactory.getEngine(DataType.cda);
		assert.strictEqual(undefined, cdaEngine);
	});

	
});
