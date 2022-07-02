import { RoverController } from '../core/roverController';
import { Rover } from '../core/rover';

class Planet {
	constructor(readonly width: number, readonly height: number) {}
}

describe('The Mars Rover', () => {
	it.each([
		['0 0 N', '0 0 N'],
		['1 1 W', '1 1 W'],
	])('stays in initial location (%p) for a given empty command', (initialLocation, expectedLocation) => {
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 1 N'],
		['0 0 E', '1 0 E'],
		['0 1 S', '0 0 S'],
		['1 0 W', '0 0 W'],
	])('moves forward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('F');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 1 N', '0 0 N'],
		['1 0 E', '0 0 E'],
		['0 0 S', '0 1 S'],
		['0 0 W', '1 0 W'],
	])('moves backward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('B');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 E'],
		['0 0 E', '0 0 S'],
		['0 0 S', '0 0 W'],
		['0 0 W', '0 0 N'],
	])('rotates 90 degrees to the right for a given right rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('R');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 W'],
		['0 0 W', '0 0 S'],
		['0 0 S', '0 0 E'],
		['0 0 E', '0 0 N'],
	])('rotates 90 degrees to the left for a given left rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('L');

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
			const rover = new RoverController(Rover.createFrom(initialLocation));

			const result = rover.process('FFF');

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
			const rover = new RoverController(Rover.createFrom(initialLocation));

			const result = rover.process('BBB');

			expect(result).toBe(expectedLocation);
		}
	);

	it('moves and rotates multiple times for a given command sequence', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = '2 2 S';
		const planet = new Planet(10, 10);
		const rover = new RoverController(Rover.createFrom(initialLocation));

		const result = rover.process('FFRFFFBRRL');

		expect(result).toBe(expectedLocation);
	});
});
