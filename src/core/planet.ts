import { Coordinates } from './coordinates';

export class Planet {
	constructor(readonly boundaryCoordinates: Coordinates, readonly obstacles: ReadonlyArray<Coordinates> = []) {}

	boundaryLatitude() {
		return this.boundaryCoordinates.latitude;
	}

	boundaryLongitude() {
		return this.boundaryCoordinates.longitude;
	}

	isBoundaryLatitude(coordinates: Coordinates) {
		return this.boundaryCoordinates.isEqualLatitude(coordinates);
	}

	isBoundaryLongitude(coordinates: Coordinates) {
		return this.boundaryCoordinates.isEqualLongitude(coordinates);
	}

	hasObstacleAt(coordinates: Coordinates) {
		return this.obstacles.filter((obstacle) => obstacle.isEqual(coordinates)).length > 0;
	}
}
