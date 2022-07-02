import { NavigatorFactory } from '../core/navigator';
import { Planet } from './roverController.test';
import { Coordinates } from '../core/coordinates';

describe('The Navigator', () => {
	it('malformed raw location are not allowed', () => {
		expect(() => {
			const planet = new Planet(new Coordinates(10, 10));
			return NavigatorFactory.createFrom('z z N', planet);
		}).toThrow('Malformed location');
	});

	it('unexpected orientation are not allowed', () => {
		expect(() => {
			const planet = new Planet(new Coordinates(10, 10));
			return NavigatorFactory.createFrom('0 0 P', planet);
		}).toThrow('Unsupported orientation');
	});
});
