import { Command } from './command';
import { Navigator } from './navigator/navigator';

export class Rover {
	constructor(private readonly navigator: Navigator) {}

	execute(command: Command) {
		if (command.isForward()) {
			return new Rover(this.navigator.moveForward());
		}
		if (command.isBackward()) {
			return new Rover(this.navigator.moveBackward());
		}
		if (command.isRotateLeft()) {
			return new Rover(this.navigator.rotateLeft());
		}
		if (command.isRotateRight()) {
			return new Rover(this.navigator.rotateRight());
		}
	}

	formattedLocation() {
		return this.navigator.formattedLocation();
	}
}
