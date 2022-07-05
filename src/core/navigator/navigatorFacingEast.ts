import { CardinalPoint, Navigator } from './navigator';
import { Coordinates } from '../coordinates';
import { Planet } from '../planet';
import { NavigatorFacingSouth } from './navigatorFacingSouth';
import { NavigatorFacingNorth } from './navigatorFacingNorth';
import { NavigatorCollidingObstacle } from './navigatorCollidingObstacle';

export class NavigatorFacingEast implements Navigator {
	constructor(readonly coordinates: Coordinates, private readonly planet: Planet) {}

	compass() {
		return CardinalPoint.East;
	}

	moveForward() {
		const stepSizeForInitialLatitude = -this.planet.boundaryLatitude();
		const coordinates = this.calculateForwardCoordinates(stepSizeForInitialLatitude);
		if (this.planet.hasObstacleAt(coordinates)) {
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingEast(coordinates, this.planet);
	}

	private calculateForwardCoordinates(stepSizeForInitialLatitude: number) {
		return this.planet.isBoundaryLatitude(this.coordinates)
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(1);
	}

	moveBackward() {
		const coordinates = this.calculateBackwardCoordinates();
		if (this.planet.hasObstacleAt(coordinates)) {
			return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.compass());
		}
		return new NavigatorFacingEast(coordinates, this.planet);
	}

	private calculateBackwardCoordinates() {
		return this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(this.planet.boundaryLatitude())
			: this.coordinates.increaseLatitude(-1);
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
