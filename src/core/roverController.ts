import {
	Navigator,
	NavigatorFacingEast,
	NavigatorFacingNorth,
	NavigatorFacingSouth,
	NavigatorFacingWest,
} from './navigator';

export class Position {
	constructor(readonly x: number, readonly y: number) {}

	static createFrom(x: string, y: string) {
		return new Position(Number(x), Number(y));
	}
}

class NavigatorFactory {
	static createFrom(orientation: string) {
		switch (orientation) {
			case 'N':
				return new NavigatorFacingNorth();
			case 'E':
				return new NavigatorFacingEast();
			case 'S':
				return new NavigatorFacingSouth();
			case 'W':
				return new NavigatorFacingWest();
			default:
				throw new Error('Unsupported operation');
		}
	}
}

class Rover {
	private constructor(readonly position: Position, readonly navigator: Navigator) {}

	static createRoverFrom(initialLocation: string) {
		const location = initialLocation.split(' ');
		const position = Position.createFrom(location[0], location[1]);
		const orientation = location[2];
		const navigator = NavigatorFactory.createFrom(orientation);
		return new Rover(position, navigator);
	}

	public rotateLeft() {
		const navigator = this.navigator.rotateLeft();
		return new Rover(this.position, navigator);
	}

	public rotateRight() {
		const navigator = this.navigator.rotateRight();
		return new Rover(this.position, navigator);
	}

	public moveBackward() {
		const position = this.navigator.moveBackward(this.position);
		return new Rover(position, this.navigator);
	}

	public moveForward() {
		const position = this.navigator.moveForward(this.position);
		return new Rover(position, this.navigator);
	}

	toString() {
		return `${this.position.x} ${this.position.y} ${this.navigator.compass()}`;
	}
}

export class RoverController {
	rover: Rover;
	constructor(private readonly initialLocation: string) {
		this.rover = Rover.createRoverFrom(this.initialLocation);
	}

	execute(rawCommands: string) {
		const commands = rawCommands.split('');
		commands.forEach((command) => {
			if (command === 'F') {
				this.rover = this.rover.moveForward();
			}
			if (command === 'B') {
				this.rover = this.rover.moveBackward();
			}
			if (command === 'R') {
				this.rover = this.rover.rotateRight();
			}
			if (command === 'L') {
				this.rover = this.rover.rotateLeft();
			}
		});

		return this.rover.toString();
	}
}
