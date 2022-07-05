import { CardinalPoint, Navigator } from './navigator';
import { Coordinates } from '../coordinates';
import { Planet } from '../planet';
import { NavigatorFacingWest } from './navigatorFacingWest';
import { NavigatorFacingEast } from './navigatorFacingEast';
import { NavigatorCollidingObstacle } from './navigatorCollidingObstacle';

export class NavigatorFacingSouth implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.South;
	}

	moveForward() {
		const coordinates = this.calculateForwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingSouth(coordinates, this.planet);
	}

	private calculateForwardCoordinates() {
		const stepSizeForInitialLongitude = this.planet.boundaryLongitude();
		return this.coordinates.isInitialLongitude()
			? this.coordinates.increaseLongitude(stepSizeForInitialLongitude)
			: this.coordinates.increaseLongitude(-1);
	}

	moveBackward() {
		const stepSizeForBoundaryLongitude = -this.planet.boundaryLongitude();
		const coordinates = this.calculateBackwardCoordinates(stepSizeForBoundaryLongitude);
		if (this.planet.hasObstacleAt(coordinates)) {
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingSouth(coordinates, this.planet);
	}

	private calculateBackwardCoordinates(stepSizeForBoundaryLongitude: number) {
		return this.planet.isBoundaryLongitude(this.coordinates)
			? this.coordinates.increaseLongitude(stepSizeForBoundaryLongitude)
			: this.coordinates.increaseLongitude(1);
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
