import { Coordinates } from '../core/coordinates';

describe('coordinates', () => {
	it('does not allow negative values for x axis', () => {
		expect(() => Coordinates.create(-1, 0)).toThrow('Negative numbers are not allowed');
	});

	it('does not allow negative values for y axis', () => {
		expect(() => Coordinates.create(0, -1)).toThrow('Negative numbers are not allowed');
	});

	it('latitudes and longitudes that are not numbers are not parsable', () => {
		expect(() => Coordinates.createFrom('a', 'b')).toThrow('Malformed coordinates');
	});
});
