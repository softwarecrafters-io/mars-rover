export enum CommandKind {
	'Forward' = 'F',
	'Backward' = 'B',
	'Left' = 'L',
	'Right' = 'R',
}

export class Command {
	constructor(private readonly value: 'F' | 'B' | 'L' | 'R') {}

	static create(rawCommand: string) {
		const isNotValidCommand = rawCommand != 'F' && rawCommand != 'B' && rawCommand != 'L' && rawCommand != 'R';
		if (isNotValidCommand) {
			throw new Error('Invalid command');
		}
		return new Command(rawCommand);
	}

	static parse(rawCommands: string) {
		return rawCommands.split('').map((c) => Command.create(c));
	}

	isForward() {
		return this.value === 'F';
	}

	isBackward() {
		return this.value === 'B';
	}

	isRotateRight() {
		return this.value === 'R';
	}

	isRotateLeft() {
		return this.value === 'L';
	}
}
