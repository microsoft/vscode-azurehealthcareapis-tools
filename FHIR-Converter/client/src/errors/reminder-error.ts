export class ReminderError extends Error {
	constructor(msg) {
	super(msg);
	this.name = 'error.reminder';
	}
}
