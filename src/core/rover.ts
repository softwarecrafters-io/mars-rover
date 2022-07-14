import { Command } from './command';
import { Navigator } from './navigator/navigator';

export class Rover {
	constructor(private navigator: Navigator) {}

	run(rawCommands: string) {
		const commands = Command.parse(rawCommands);
		this.executeCommands(commands);
		return this.formattedLocation();
	}

	private executeCommands = (commands: ReadonlyArray<Command>): void => {
		commands.forEach((command: Command) => {
			this.navigator = this.executeNavigator(command);
		});
	};

	private executeNavigator(command: Command) {
		if (command.isForward()) {
			return this.navigator.moveForward();
		}
		if (command.isBackward()) {
			return this.navigator.moveBackward();
		}
		if (command.isRotateLeft()) {
			return this.navigator.rotateLeft();
		}
		return this.navigator.rotateRight();
	}

	formattedLocation() {
		return this.navigator.formattedLocation();
	}
}
