export class ConfigurationError extends Error {
	constructor(msg) {
	super(msg);
	this.name = 'error.configuration';
	}
}
