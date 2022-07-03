import { Planet } from '../planet';
import { Coordinates } from '../coordinates';
import { NavigatorFacingWest } from './navigatorFacingWest';
import { NavigatorFacingNorth } from './navigatorFacingNorth';
import { NavigatorFacingSouth } from './navigatorFacingSouth';
import { NavigatorFacingEast } from './navigatorFacingEast';

export enum CardinalPoint {
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
