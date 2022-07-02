import { Rover } from './rover';
import { RoverCommand } from './roverCommand';

export class RoverController {
	constructor(private readonly rover: Rover) {}

	process(rawCommands: string) {
		const commands = RoverCommand.translate(rawCommands);
		const rover = this.executeCommands(commands, this.rover);
		return rover.currentLocation();
	}

	private executeCommands = (commands: ReadonlyArray<RoverCommand>, rover: Rover): Rover => {
		const isEmptyCommands = commands.length == 0;
		if (isEmptyCommands) {
			return rover;
		}
		const nextCommand = commands[0];
		const remainingCommands = commands.slice(1);
		return this.executeCommands(remainingCommands, rover.execute(nextCommand));
	};
}
