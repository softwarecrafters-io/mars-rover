import { Coordinates } from '../coordinates';
import { Planet } from '../planet';
import { CardinalPoint, Navigator } from './navigator';
import { NavigatorFacingNorth } from './navigatorFacingNorth';
import { NavigatorFacingSouth } from './navigatorFacingSouth';

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
		return this.coordinates.isInitialLatitude()
			? this.coordinates.increaseLatitude(stepSizeForInitialLatitude)
			: this.coordinates.increaseLatitude(-1);
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
		return this.planet.isBoundaryLatitude(this.coordinates)
			? this.coordinates.increaseLatitude(stepForBoundaryLatitude)
			: this.coordinates.increaseLatitude(1);
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
