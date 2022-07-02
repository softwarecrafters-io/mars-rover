import { Coordinates } from './coordinates';
import { Planet } from './planet';

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
		if (location.length !== 3) {
			throw new Error('Malformed raw location');
		}
		const coordinates = Coordinates.createFrom(location[0], location[1]);
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
		const stepSizeForInitialLongitude = -this.planet.boundaryCoordinates.longitude;
		const coordinates = this.coordinates.isBoundaryLongitude(this.planet.boundaryCoordinates)
			? this.coordinates.increaseLongitude(stepSizeForInitialLongitude)
			: this.coordinates.increaseLongitude(1);
		return new NavigatorFacingNorth(coordinates, this.planet);
	}

	moveBackward() {
		const coordinates = this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(this.planet.boundaryCoordinates.longitude)
			: this.coordinates.increaseLongitude(-1);
		return new NavigatorFacingNorth(coordinates, this.planet);
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
		const stepSizeForInitialLongitude = this.planet.boundaryCoordinates.longitude;
		const coordinates = this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(stepSizeForInitialLongitude)
			: this.coordinates.increaseLongitude(-1);
		return new NavigatorFacingSouth(coordinates, this.planet);
	}

	moveBackward() {
		const stepSizeForBoundaryLongitude = -this.planet.boundaryCoordinates.longitude;
		const coordinates = this.coordinates.isBoundaryLongitude(this.planet.boundaryCoordinates)
			? this.coordinates.increaseLongitude(stepSizeForBoundaryLongitude)
			: this.coordinates.increaseLongitude(1);
		return new NavigatorFacingSouth(coordinates, this.planet);
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
		const stepSizeForInitialLatitude = -this.planet.boundaryCoordinates.latitude;
		const coordinates = this.coordinates.isBoundaryLatitude(this.planet.boundaryCoordinates)
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(1);
		return new NavigatorFacingEast(coordinates, this.planet);
	}

	moveBackward() {
		const coordinates = this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(this.planet.boundaryCoordinates.latitude)
			: this.coordinates.increaseLatitude(-1);
		return new NavigatorFacingEast(coordinates, this.planet);
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
		const stepSizeForInitialLatitude = this.planet.boundaryCoordinates.latitude;
		const coordinates = this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(-1);
		return new NavigatorFacingWest(coordinates, this.planet);
	}

	moveBackward() {
		const stepForBoundaryLatitude = -this.planet.boundaryCoordinates.latitude;
		const coordinates = this.coordinates.isBoundaryLatitude(this.planet.boundaryCoordinates)
			? this.coordinates.increaseLatitude(stepForBoundaryLatitude)
			: this.coordinates.increaseLatitude(1);
		return new NavigatorFacingWest(coordinates, this.planet);
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
