import { Status } from '../../core/enum/status';

export function checkEngineStatus(msg: any) {
	return msg.Status === Status.OK;
}
