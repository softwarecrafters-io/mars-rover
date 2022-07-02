export class Position {
	constructor(private readonly x: number, private readonly y: number) {}

	static createFrom(x: number, y: number) {
		if (x < 0 || y < 0) {
			throw new Error('Negative numbers are not allowed');
		}
		return new Position(x, y);
	}

	increaseX(stepSize: number) {
		return new Position(this.x + stepSize, this.y);
	}

	increaseY(stepSize: number) {
		return new Position(this.x, this.y + stepSize);
	}

	toString() {
		return `${this.x} ${this.y}`;
	}
}
