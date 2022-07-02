import { Rover } from './rover';
import { Command } from './command';

export class RoverController {
	constructor(private readonly rover: Rover) {}

	process(rawCommands: string) {
		const commands = Command.translate(rawCommands);
		const rover = this.executeCommands(commands, this.rover);
		return rover.formattedLocation();
	}

	private executeCommands = (commands: ReadonlyArray<Command>, rover: Rover): Rover => {
		const isEmptyCommands = commands.length == 0;
		if (isEmptyCommands) {
			return rover;
		}
		const nextCommand = commands[0];
		const remainingCommands = commands.slice(1);
		return this.executeCommands(remainingCommands, rover.execute(nextCommand));
	};
}
