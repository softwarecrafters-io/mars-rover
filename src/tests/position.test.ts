import { Position } from '../core/position';

describe('Position', () => {
	it('does not allow negative values for x axis', () => {
		expect(() => Position.createFrom(-1, 0)).toThrow('Negative numbers are not allowed');
	});

	it('does not allow negative values for y axis', () => {
		expect(() => Position.createFrom(0, -1)).toThrow('Negative numbers are not allowed');
	});
});
