import { Rover } from '../core/rover';
import { Coordinates } from '../core/coordinates';
import { Planet } from '../core/planet';
import { NavigatorFactory } from '../core/navigator/navigator';

describe('The Mars Rover', () => {
	it.each([
		['0 0 N', '0 0 N'],
		['1 1 W', '1 1 W'],
	])('stays in initial location (%p) for a given empty command', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		const result = rover.run('');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 1 N'],
		['0 1 S', '0 0 S'],
		['0 0 E', '1 0 E'],
		['1 0 W', '0 0 W'],
	])('moves forward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('F')).toBe(expectedLocation);
	});

	it.each([
		['0 1 N', '0 0 N'],
		['0 0 S', '0 1 S'],
		['1 0 E', '0 0 E'],
		['0 0 W', '1 0 W'],
	])('moves backward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('B')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 E'],
		['0 0 E', '0 0 S'],
		['0 0 S', '0 0 W'],
		['0 0 W', '0 0 N'],
	])('rotates 90 degrees to the right for a given right rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('R')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 W'],
		['0 0 W', '0 0 S'],
		['0 0 S', '0 0 E'],
		['0 0 E', '0 0 N'],
	])('rotates 90 degrees to the left for a given left rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('L')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 3 N'],
		['0 3 S', '0 0 S'],
		['0 0 E', '3 0 E'],
		['3 0 W', '0 0 W'],
	])(
		'moves forward multiple step in the axis for a given forward command (%p)',
		(initialLocation, expectedLocation) => {
			const rover = createRover(initialLocation);

			expect(rover.run('FFF')).toBe(expectedLocation);
		}
	);

	it.each([
		['0 3 N', '0 0 N'],
		['0 0 S', '0 3 S'],
		['3 0 E', '0 0 E'],
		['0 0 W', '3 0 W'],
	])(
		'moves backward multiple step in the axis for a given forward command (%p)',
		(initialLocation, expectedLocation) => {
			const rover = createRover(initialLocation);

			expect(rover.run('BBB')).toBe(expectedLocation);
		}
	);

	it('moves and rotates multiple times for a given command sequence', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = '2 2 S';
		const rover = createRover(initialLocation);

		expect(rover.run('FFRFFFBRRL')).toBe(expectedLocation);
	});

	it.each([
		['0 10 N', '0 0 N'],
		['0 0 S', '0 10 S'],
		['10 0 E', '0 0 E'],
		['0 0 W', '10 0 W'],
	])('moves forward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('F')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 10 N'],
		['0 10 S', '0 0 S'],
		['0 0 E', '10 0 E'],
		['10 0 W', '0 0 W'],
	])('moves backward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('B')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 10 N'],
		['0 10 S', '0 0 S'],
		['0 0 E', '10 0 E'],
		['10 0 W', '0 0 W'],
	])('moves backward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const rover = createRover(initialLocation);

		expect(rover.run('B')).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', 'O 0 0 N'],
		['0 2 S', 'O 0 2 S'],
	])(
		'prints its last location indicating that it has collided with an obstacle when is going forward in y-axis (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(0, 1)];
			const rover = createRover(initialLocation, obstacles);

			expect(rover.run('F')).toBe(expectedLocation);
		}
	);

	it.each([
		['0 0 E', 'O 0 0 E'],
		['2 0 W', 'O 2 0 W'],
	])(
		'prints its last location indicating that it has collided with an obstacle when is going forward in x-axis (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(1, 0)];
			const rover = createRover(initialLocation, obstacles);

			expect(rover.run('F')).toBe(expectedLocation);
		}
	);

	it.each([
		['0 2 N', 'O 0 2 N'],
		['0 0 S', 'O 0 0 S'],
	])(
		'prints its last location indicating that it has collided with an obstacle when is going backward in y-axis (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(0, 1)];
			const rover = createRover(initialLocation, obstacles);

			expect(rover.run('B')).toBe(expectedLocation);
		}
	);

	it.each([
		['2 0 E', 'O 2 0 E'],
		['0 0 W', 'O 0 0 W'],
	])(
		'prints its last location indicating that it has collided with an obstacle when is going forward in x-axis (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(1, 0)];
			const rover = createRover(initialLocation, obstacles);

			expect(rover.run('B')).toBe(expectedLocation);
		}
	);

	it('stops executing commands after colliding obstacle', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = 'O 0 1 N';
		const obstacles = [Coordinates.create(0, 2)];
		const rover = createRover(initialLocation, obstacles);
		expect(rover.run('FFRFFLF')).toBe(expectedLocation);
	});
});

function createRover(initialLocation: string, obstacles: ReadonlyArray<Coordinates> = []) {
	const planet = new Planet(Coordinates.create(10, 10), obstacles);
	const navigator = NavigatorFactory.createFrom(initialLocation, planet);
	return new Rover(navigator);
}
