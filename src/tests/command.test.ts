import { Command } from '../core/command';

describe('The rover command', () => {
	it('invalid commands are not allowed', () => {
		expect(() => Command.create('asdf')).toThrow('Invalid command');
	});
});
