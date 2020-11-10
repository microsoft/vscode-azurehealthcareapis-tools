export class ConversionError extends Error {
	constructor(msg) {
	super(msg);
	this.name = 'error.conversion';
	}
}
