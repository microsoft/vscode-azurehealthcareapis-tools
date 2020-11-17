import * as assert from 'assert';
import * as engineUtils from '../../../core/common/utils/engine-utils';

suite('Engine Utils Test Suite', () => {
	const msgOk = {
		Status: 'OK',
		FhirResource: {
			'resourceType': 'Bundle',
			'type': 'transaction',
			'entry': [{
				'fullUrl': 'uuid-sample',
				'resource': {
					'resourceType': 'Patient'
				}
			}]
		}
	};

	const msgFail = {
		Status: 'Fail',
		ErrorType: 'System.FormatException',
		ErrorMessage: 'Invalid Hl7 v2 message, first segment id = |^~'
	};

	test('Function checkEngineStatus - should return true when the status of response from engine is OK', () => {
		assert.strictEqual(engineUtils.checkEngineStatus(msgOk), true);
	});

	test('Function checkEngineStatus - should return false when the status of response from engine is Fail', () => {
		assert.strictEqual(engineUtils.checkEngineStatus(msgFail), false);
	});
});
