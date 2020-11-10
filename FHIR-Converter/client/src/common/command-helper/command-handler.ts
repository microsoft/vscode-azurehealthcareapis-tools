import * as errorHandler from '../errors/error-handler';

export async function commandHandler(event) {
	try {
		await this(event);
	} catch (error) {
		errorHandler.handle(error);
	}
}
