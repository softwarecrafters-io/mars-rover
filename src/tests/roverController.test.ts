import { RoverController } from '../core/roverController';
import { Rover } from '../core/rover';
import { Coordinates } from '../core/coordinates';
import { Planet } from '../core/planet';
import { NavigatorFactory } from '../core/navigator/navigator';

describe('The Mars Rover', () => {
	it.each([
		['0 0 N', '0 0 N'],
		['1 1 W', '1 1 W'],
	])('stays in initial location (%p) for a given empty command', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 1 N'],
		['0 1 S', '0 0 S'],
		['0 0 E', '1 0 E'],
		['1 0 W', '0 0 W'],
	])('moves forward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('F');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 1 N', '0 0 N'],
		['0 0 S', '0 1 S'],
		['1 0 E', '0 0 E'],
		['0 0 W', '1 0 W'],
	])('moves backward one step in the axis for a given forward command (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('B');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 E'],
		['0 0 E', '0 0 S'],
		['0 0 S', '0 0 W'],
		['0 0 W', '0 0 N'],
	])('rotates 90 degrees to the right for a given right rotation command (%p)', (initialLocation, expectedLocation) => {
		const rover = createRoverController(initialLocation);

		const result = rover.process('R');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 0 W'],
		['0 0 W', '0 0 S'],
		['0 0 S', '0 0 E'],
		['0 0 E', '0 0 N'],
	])('rotates 90 degrees to the left for a given left rotation command (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('L');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 3 N'],
		['0 3 S', '0 0 S'],
		['0 0 E', '3 0 E'],
		['3 0 W', '0 0 W'],
	])(
		'moves forward multiple step in the axis for a given forward command (%p)',
		(initialLocation, expectedLocation) => {
			const roverController = createRoverController(initialLocation);

			const result = roverController.process('FFF');

			expect(result).toBe(expectedLocation);
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
			const roverController = createRoverController(initialLocation);

			const result = roverController.process('BBB');

			expect(result).toBe(expectedLocation);
		}
	);

	it('moves and rotates multiple times for a given command sequence', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = '2 2 S';
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('FFRFFFBRRL');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 10 N', '0 0 N'],
		['0 0 S', '0 10 S'],
		['10 0 E', '0 0 E'],
		['0 0 W', '10 0 W'],
	])('moves forward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('F');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 10 N'],
		['0 10 S', '0 0 S'],
		['0 0 E', '10 0 E'],
		['10 0 W', '0 0 W'],
	])('moves backward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('B');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', '0 10 N'],
		['0 10 S', '0 0 S'],
		['0 0 E', '10 0 E'],
		['10 0 W', '0 0 W'],
	])('moves backward one step in the boundary coordinates of the planet (%p)', (initialLocation, expectedLocation) => {
		const roverController = createRoverController(initialLocation);

		const result = roverController.process('B');

		expect(result).toBe(expectedLocation);
	});

	it.each([
		['0 0 N', 'O 0 0 N'],
		//['0 2 S', 'O 0 0 S'],
	])(
		'prints its last location indicating that it has collided with an obstacle (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(0, 1)];
			const roverController = createRoverController(initialLocation, obstacles);

			const result = roverController.process('F');

			expect(result).toBe(expectedLocation);
		}
	);

	it.each([
		['0 0 E', '0 0 E'],
		['2 0 W', '2 0 W'],
	])(
		'is not able to move forward when it finds an obstacle in the latitude (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(1, 0)];
			const roverController = createRoverController(initialLocation, obstacles);

			const result = roverController.process('F');

			expect(result).toBe(expectedLocation);
		}
	);

	it.each([
		['0 2 N', '0 2 N'],
		['0 0 S', '0 0 S'],
	])(
		'is not able to move backward when it finds an obstacle in the longitude (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(0, 1)];
			const roverController = createRoverController(initialLocation, obstacles);

			const result = roverController.process('B');

			expect(result).toBe(expectedLocation);
		}
	);

	it.each([
		['2 0 E', '2 0 E'],
		['0 0 W', '0 0 W'],
	])(
		'is not able to move backward when it finds an obstacle in the latitude (%p)',
		(initialLocation, expectedLocation) => {
			const obstacles = [Coordinates.create(1, 0)];
			const roverController = createRoverController(initialLocation, obstacles);

			const result = roverController.process('B');

			expect(result).toBe(expectedLocation);
		}
	);

	it('avoids several obstacles after colliding with them with the proper command sequence', () => {
		const initialLocation = '0 0 N';
		const expectedLocation = '1 1 N';
		const obstacles = [Coordinates.create(0, 1), Coordinates.create(2, 0)];
		const roverController = createRoverController(initialLocation, obstacles);

		const result = roverController.process('FRFFLF');

		expect(result).toBe(expectedLocation);
	});
});

function createRoverController(initialLocation: string, obstacles: ReadonlyArray<Coordinates> = []) {
	const planet = new Planet(Coordinates.create(10, 10), obstacles);
	const navigator = NavigatorFactory.createFrom(initialLocation, planet);
	const rover = new Rover(navigator);
	return new RoverController(rover);
}
