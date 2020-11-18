/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// import { ConverterEngineFactory } from '../../../core/converter/converter-factory';
// import * as assert from 'assert';
// import { ConverterType } from '../../../core/common/enum/converter-type';
// import { Hl7v2FhirConverterEngine } from '../../../core/converter-engine/hl7v2-fhir-converter-engine';

// suite('Converter Engine Factory Test Suite', () => {

// 	test('Function getEngine - should return the same instance using the singleton pattern', async () => {
// 		const converterEngineFactory = ConverterEngineFactory.getInstance();
// 		const Hl7v2Engine1 = converterEngineFactory.createConverter(ConverterType.hl7v2ToFhir);
// 		const Hl7v2Engine2 = converterEngineFactory.createConverter().getEngine(ConverterType.hl7v2ToFhir);
// 		assert.strictEqual(Hl7v2Engine1, Hl7v2Engine2);
// 	});

// 	test('Function getEngine - should return a engine with the given data type', async () => {
// 		const Hl7v2Engine = new ConverterEngineFactory().getEngine(ConverterType.hl7v2ToFhir);
// 		assert.strictEqual(true, Hl7v2Engine instanceof Hl7v2FhirConverterEngine);
// 		assert.strictEqual(ConverterType.hl7v2ToFhir, Hl7v2Engine.type);
// 	});

// 	test('Function getEngine - should return undefined given unsupported data type', async () => {
// 		const cdaEngine = new ConverterEngineFactory().getEngine(ConverterType.cdaToFhir);
// 		assert.strictEqual(undefined, cdaEngine);
// 	});

// 	test('Function getEngine - should return a new engine given another data type', async () => {
// 		const converterEngineFactory = new ConverterEngineFactory();
// 		const Hl7v2Engine = converterEngineFactory.getEngine(ConverterType.hl7v2ToFhir);
// 		assert.strictEqual(ConverterType.hl7v2ToFhir, Hl7v2Engine.type);
// 		const cdaEngine = converterEngineFactory.getEngine(ConverterType.cdaToFhir);
// 		assert.strictEqual(undefined, cdaEngine);
// 	});

	
// });
