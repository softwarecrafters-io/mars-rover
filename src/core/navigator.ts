import { Coordinates } from './coordinates';
import { Planet } from '../tests/roverController.test';

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
	static createFrom(rawLocation: string, planet: Planet) {
		const location = rawLocation.split(' ');
		const x = Number.parseInt(location[0]);
		const y = Number.parseInt(location[1]);
		if (isNaN(x) || isNaN(y)) {
			throw new Error('Malformed location');
		}
		const coordinates = Coordinates.createFrom(x, y);
		const orientation = location[2];
		return this.create(coordinates, orientation, planet);
	}

	static create(coordinates: Coordinates, orientation: string, planet: Planet) {
		switch (orientation) {
			case CardinalPoint.North:
				return new NavigatorFacingNorth(coordinates, planet);
			case CardinalPoint.East:
				return new NavigatorFacingEast(coordinates, planet);
			case CardinalPoint.South:
				return new NavigatorFacingSouth(coordinates, planet);
			case CardinalPoint.West:
				return new NavigatorFacingWest(coordinates, planet);
			default:
				throw new Error('Unsupported orientation');
		}
	}
}

export class NavigatorFacingNorth implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}
	compass() {
		return CardinalPoint.North;
	}

	moveForward() {
		const coordinates = this.coordinates.increaseY(1);
		return new NavigatorFacingNorth(coordinates, this.planet);
	}

	moveBackward() {
		return new NavigatorFacingNorth(this.coordinates.increaseY(-1), this.planet);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingEast(this.coordinates, this.planet);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingWest(this.coordinates, this.planet);
	}

	formattedLocation() {
		return `${this.coordinates.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingSouth implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.South;
	}

	moveForward() {
		return new NavigatorFacingSouth(this.coordinates.increaseY(-1), this.planet);
	}

	moveBackward() {
		return new NavigatorFacingSouth(this.coordinates.increaseY(1), this.planet);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingWest(this.coordinates, this.planet);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingEast(this.coordinates, this.planet);
	}

	formattedLocation() {
		return `${this.coordinates.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingEast implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.East;
	}

	moveForward() {
		return new NavigatorFacingEast(this.coordinates.increaseX(1), this.planet);
	}

	moveBackward() {
		return new NavigatorFacingEast(this.coordinates.increaseX(-1), this.planet);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingSouth(this.coordinates, this.planet);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingNorth(this.coordinates, this.planet);
	}

	formattedLocation() {
		return `${this.coordinates.toString()} ${this.compass()}`;
	}
}

export class NavigatorFacingWest implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.West;
	}

	moveForward() {
		return new NavigatorFacingWest(this.coordinates.increaseX(-1), this.planet);
	}

	moveBackward() {
		return new NavigatorFacingWest(this.coordinates.increaseX(1), this.planet);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingNorth(this.coordinates, this.planet);
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingSouth(this.coordinates, this.planet);
	}

	formattedLocation() {
		return `${this.coordinates.toString()} ${this.compass()}`;
	}
}
