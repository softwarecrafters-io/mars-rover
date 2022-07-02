import { Coordinates } from '../core/coordinates';

describe('coordinates', () => {
	it('does not allow negative values for x axis', () => {
		expect(() => Coordinates.createFrom(-1, 0)).toThrow('Negative numbers are not allowed');
	});

	it('does not allow negative values for y axis', () => {
		expect(() => Coordinates.createFrom(0, -1)).toThrow('Negative numbers are not allowed');
	});
});
