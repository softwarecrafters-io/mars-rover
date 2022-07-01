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

interface Command {
	//execute(): Rover;
}

type CommandUnion = MoveForwardCommand | RotateRightCommand | RotateLeftCommand | MoveBackwardCommand;

class MoveForwardCommand {
	action: 'moveForward' = 'moveForward';
}

class RotateRightCommand {
	action: 'rotateRight' = 'rotateRight';
}

class RotateLeftCommand {
	action: 'rotateLeft' = 'rotateLeft';
}

class MoveBackwardCommand {
	action: 'moveBackward' = 'moveBackward';
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

	execute(command: CommandUnion) {
		switch (command.action) {
			case 'rotateLeft':
				return new Rover(this.position, this.navigator.rotateLeft());
			case 'rotateRight':
				return new Rover(this.position, this.navigator.rotateRight());
			case 'moveForward':
				return new Rover(this.navigator.moveForward(this.position), this.navigator);
			case 'moveBackward':
				return new Rover(this.navigator.moveBackward(this.position), this.navigator);
		}
	}

	printLocation() {
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
				const moveFordwardCommand = new MoveForwardCommand();
				this.rover = this.rover.execute(moveFordwardCommand);
			}
			if (command === 'B') {
				this.rover = this.rover.execute(new MoveBackwardCommand());
			}
			if (command === 'R') {
				this.rover = this.rover.execute(new RotateRightCommand());
			}
			if (command === 'L') {
				this.rover = this.rover.execute(new RotateLeftCommand());
			}
		});

		return this.rover.printLocation();
	}
}
