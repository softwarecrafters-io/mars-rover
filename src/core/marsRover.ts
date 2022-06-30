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

export class MarsRover {
	private position: Position;
	private navigator: Navigator;

	constructor(private readonly initialLocation: string) {}

	execute(rawCommands: string) {
		const location = this.initialLocation.split(' ');
		this.position = Position.createFrom(location[0], location[1]);
		const orientation = location[2];
		this.navigator = NavigatorFactory.createFrom(orientation);
		const commands = rawCommands.split('');
		commands.forEach((command) => {
			if (command === 'F') {
				this.position = this.navigator.moveForward(this.position);
			}
			if (command === 'B') {
				this.position = this.navigator.moveBackward(this.position);
			}
			if (command === 'R') {
				this.navigator = this.navigator.rotateRight();
			}
			if (command === 'L') {
				this.navigator = this.navigator.rotateLeft();
			}
		});

		return `${this.position.x} ${this.position.y} ${this.navigator.compass()}`;
	}
}
