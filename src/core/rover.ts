import { Navigator, NavigatorFactory } from './navigator';
import { RoverCommand } from './roverCommand';
import { Position } from './position';

export class Rover {
	private constructor(readonly currentPosition: Position, readonly navigator: Navigator) {}

	static createFrom(initialLocation: string) {
		const location = initialLocation.split(' ');
		const x = Number(location[0]);
		const y = Number(location[1]);
		const position = Position.createFrom(x, y);
		const orientation = location[2];
		const navigator = NavigatorFactory.createFrom(orientation);
		return new Rover(position, navigator);
	}

	execute(command: RoverCommand) {
		if (command.isForward()) {
			return new Rover(this.navigator.moveForward(this.currentPosition), this.navigator);
		}
		if (command.isBackward()) {
			return new Rover(this.navigator.moveBackward(this.currentPosition), this.navigator);
		}
		if (command.isRotateLeft()) {
			return new Rover(this.currentPosition, this.navigator.rotateLeft());
		}
		if (command.isRotateRight()) {
			return new Rover(this.currentPosition, this.navigator.rotateRight());
		}
	}

	currentLocation() {
		return `${this.currentPosition.toString()} ${this.navigator.compass()}`;
	}
}
