import * as errorHandler from '../../common/errors/error-handler';

export async function commandHandler(event) {
	try {
		// Execute the command
		await this(event);
	} catch (error) {
		// Handle the error
		errorHandler.handle(error);
	}
}
