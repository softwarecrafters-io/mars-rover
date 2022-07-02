import { NavigatorFactory } from '../core/navigator';
import { Coordinates } from '../core/coordinates';
import { Planet } from '../core/planet';

describe('The Navigator', () => {
	it('malformed raw location are not allowed', () => {
		expect(() => {
			const planet = new Planet(Coordinates.create(10, 10));
			return NavigatorFactory.createFrom('asdg', planet);
		}).toThrow('Malformed raw location');
	});

	it('unexpected orientation are not allowed', () => {
		expect(() => {
			const planet = new Planet(Coordinates.create(10, 10));
			return NavigatorFactory.createFrom('0 0 P', planet);
		}).toThrow('Unsupported orientation');
	});
});
