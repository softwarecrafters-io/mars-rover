import { RoverController } from '../core/roverController';

describe('The Mars Rover', () => {
	it.each([
		['0 0 N', '0 0 N'],
		['1 1 W', '1 1 W'],
	])('stays in initial location (%p) for a given empty command', (initialLocation, expectedLocation) => {
		const rover = new RoverController(initialLocation);

		const result = rover.execute('');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 1 N'],
		['0 0 E', '1 0 E'],
		['0 1 S', '0 0 S'],
		['1 0 W', '0 0 W'],
	])('moves forward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(initialLocation);

		const result = rover.execute('F');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 1 N', '0 0 N'],
		['1 0 E', '0 0 E'],
		['0 0 S', '0 1 S'],
		['0 0 W', '1 0 W'],
	])('moves backward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(initialLocation);

		const result = rover.execute('B');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 E'],
		['0 0 E', '0 0 S'],
		['0 0 S', '0 0 W'],
		['0 0 W', '0 0 N'],
	])('rotates 90 degrees to the right for a given right rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(initialLocation);

		const result = rover.execute('R');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 W'],
		['0 0 W', '0 0 S'],
		['0 0 S', '0 0 E'],
		['0 0 E', '0 0 N'],
	])('rotates 90 degrees to the left for a given left rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(initialLocation);

		const result = rover.execute('L');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 3 N'],
		['0 0 E', '3 0 E'],
		['0 3 S', '0 0 S'],
		['3 0 W', '0 0 W'],
	])(
		'moves forward multiple step in the axis for a given forward command (%p)',
		(initialLocation, expectedLocation) => {
			const rover = new RoverController(initialLocation);

			const result = rover.execute('FFF');

			expect(result).toBe(expectedLocation);
		}
	);

	it.each([
		['0 3 N', '0 0 N'],
		['3 0 E', '0 0 E'],
		['0 0 S', '0 3 S'],
		['0 0 W', '3 0 W'],
	])(
		'moves backward multiple step in the axis for a given forward command (%p)',
		(initialLocation, expectedLocation) => {
			const rover = new RoverController(initialLocation);

			const result = rover.execute('BBB');

			expect(result).toBe(expectedLocation);
		}
	);

	it('moves and rotates multiple times for a given command sequence', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = '2 2 S';
		const rover = new RoverController(initialLocation);

		const result = rover.execute('FFRFFFBRRL');

		expect(result).toBe(expectedLocation);
	});
});
