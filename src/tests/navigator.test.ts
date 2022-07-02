import { NavigatorFactory } from '../core/navigator';

describe('The Navigator', () => {
	it('malformed raw location are not allowed', () => {
		expect(() => NavigatorFactory.createFromLocation('z z N')).toThrow('Malformed location');
	});

	it('unexpected orientation are not allowed', () => {
		expect(() => NavigatorFactory.createFromLocation('0 0 P')).toThrow('Unsupported orientation');
	});
});
