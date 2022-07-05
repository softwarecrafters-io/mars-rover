import { CardinalPoint, Navigator } from './navigator';
import { Coordinates } from '../coordinates';
import { Planet } from '../planet';
import { NavigatorFacingWest } from './navigatorFacingWest';
import { NavigatorFacingEast } from './navigatorFacingEast';
import { NavigatorCollidingObstacle } from './navigatorCollidingObstacle';

export class NavigatorFacingNorth implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.North;
	}

	moveForward() {
		const nextCoordinates = this.calculateForwardCoordinates();
		if (this.planet.hasObstacleAt(nextCoordinates)) {
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingNorth(nextCoordinates, this.planet);
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
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingNorth(coordinates, this.planet);
	}

	private calculateBackwardCoordinates() {
		return this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(this.planet.boundaryLongitude())
			: this.coordinates.increaseLongitude(-1);
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
