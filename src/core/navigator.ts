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
		const coordinates = this.calculateForwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingNorth(coordinates, this.planet);
	}

	private calculateForwardCoordinates() {
		const stepSizeForInitialLongitude = -this.planet.boundaryLongitude();
		return this.planet.isBoundaryLongitude(this.coordinates)
			? this.coordinates.increaseLongitude(stepSizeForInitialLongitude)
			: this.coordinates.increaseLongitude(1);
	}

	moveBackward() {
		const coordinates = this.calculateBackwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingNorth(coordinates, this.planet);
	}

	private calculateBackwardCoordinates() {
		const coordinates = this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(this.planet.boundaryLongitude())
			: this.coordinates.increaseLongitude(-1);
		return coordinates;
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
		const coordinates = this.calculateForwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingSouth(coordinates, this.planet);
	}

	private calculateForwardCoordinates() {
		const stepSizeForInitialLongitude = this.planet.boundaryLongitude();
		const coordinates = this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(stepSizeForInitialLongitude)
			: this.coordinates.increaseLongitude(-1);
		return coordinates;
	}

	moveBackward() {
		const stepSizeForBoundaryLongitude = -this.planet.boundaryLongitude();
		const coordinates = this.calculateBackwardCoordinates(stepSizeForBoundaryLongitude);
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingSouth(coordinates, this.planet);
	}

	private calculateBackwardCoordinates(stepSizeForBoundaryLongitude: number) {
		const coordinates = this.planet.isBoundaryLongitude(this.coordinates)
			? this.coordinates.increaseLongitude(stepSizeForBoundaryLongitude)
			: this.coordinates.increaseLongitude(1);
		return coordinates;
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
		const stepSizeForInitialLatitude = -this.planet.boundaryLatitude();
		const coordinates = this.calculateForwardCoordinates(stepSizeForInitialLatitude);
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingEast(coordinates, this.planet);
	}

	private calculateForwardCoordinates(stepSizeForInitialLatitude: number) {
		const coordinates = this.planet.isBoundaryLatitude(this.coordinates)
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(1);
		return coordinates;
	}

	moveBackward() {
		const coordinates = this.calculateBackwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingEast(coordinates, this.planet);
	}

	private calculateBackwardCoordinates() {
		const coordinates = this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(this.planet.boundaryLatitude())
			: this.coordinates.increaseLatitude(-1);
		return coordinates;
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
		const coordinates = this.calculateForwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingWest(coordinates, this.planet);
	}

	private calculateForwardCoordinates() {
		const stepSizeForInitialLatitude = this.planet.boundaryLatitude();
		const coordinates = this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(-1);
		return coordinates;
	}

	moveBackward() {
		const coordinates = this.calculateBackwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return this;
		}
		return new NavigatorFacingWest(coordinates, this.planet);
	}

	private calculateBackwardCoordinates() {
		const stepForBoundaryLatitude = -this.planet.boundaryLatitude();
		const coordinates = this.planet.isBoundaryLatitude(this.coordinates)
			? this.coordinates.increaseLatitude(stepForBoundaryLatitude)
			: this.coordinates.increaseLatitude(1);
		return coordinates;
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
