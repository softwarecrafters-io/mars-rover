import { Position } from './position';

enum CardinalPoint {
	North = 'N',
	South = 'S',
	East = 'E',
	West = 'W',
}

export interface Navigator {
	formattedLocation(): string;
	moveForward(): Navigator;
	moveBackward(): Navigator;
	compass(): CardinalPoint;
	rotateRight(): Navigator;
	rotateLeft(): Navigator;
}

export class NavigatorFactory {
	static createFromLocation(rawLocation: string) {
		const location = rawLocation.split(' ');
		const x = Number.parseInt(location[0]);
		const y = Number.parseInt(location[1]);
		if (isNaN(x) || isNaN(y)) {
			throw new Error('Malformed location');
		}
		const position = Position.createFrom(x, y);
		const orientation = location[2];
		return this.createFrom(position, orientation);
	}

	static createFrom(position: Position, orientation: string) {
		switch (orientation) {
			case CardinalPoint.North:
				return new NavigatorFacingNorth(position);
			case CardinalPoint.East:
				return new NavigatorFacingEast(position);
			case CardinalPoint.South:
				return new NavigatorFacingSouth(position);
			case CardinalPoint.West:
				return new NavigatorFacingWest(position);
			default:
				throw new Error('Unsupported orientation');
		}
	}
}

export class NavigatorFacingNorth implements Navigator {
	constructor(readonly position: Position) {}
	compass() {
		return CardinalPoint.North;
	}

	moveForward() {
		return new NavigatorFacingNorth(this.position.increaseY(1));
	}

	moveBackward() {
		return new NavigatorFacingNorth(this.position.increaseY(-1));
	}

	rotateRight(): Navigator {
		return new NavigatorFacingEast(this.position);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingWest(this.position);
	}

	formattedLocation() {
		return `${this.position.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingSouth implements Navigator {
	constructor(readonly position: Position) {}

	compass() {
		return CardinalPoint.South;
	}

	moveForward() {
		return new NavigatorFacingSouth(this.position.increaseY(-1));
	}

	moveBackward() {
		return new NavigatorFacingSouth(this.position.increaseY(1));
	}

	rotateRight(): Navigator {
		return new NavigatorFacingWest(this.position);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingEast(this.position);
	}

	formattedLocation() {
		return `${this.position.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingEast implements Navigator {
	constructor(readonly position: Position) {}

	compass() {
		return CardinalPoint.East;
	}

	moveForward() {
		return new NavigatorFacingEast(this.position.increaseX(1));
	}

	moveBackward() {
		return new NavigatorFacingEast(this.position.increaseX(-1));
	}

	rotateRight(): Navigator {
		return new NavigatorFacingSouth(this.position);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingNorth(this.position);
	}

	formattedLocation() {
		return `${this.position.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingWest implements Navigator {
	constructor(readonly position: Position) {}

	compass() {
		return CardinalPoint.West;
	}

	moveForward() {
		return new NavigatorFacingWest(this.position.increaseX(-1));
	}

	moveBackward() {
		return new NavigatorFacingWest(this.position.increaseX(1));
	}

	rotateRight(): Navigator {
		return new NavigatorFacingNorth(this.position);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingSouth(this.position);
	}

	formattedLocation() {
		return `${this.position.toString()} ${this.compass()}`;
	}
}
