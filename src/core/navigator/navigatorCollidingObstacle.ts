import { CardinalPoint, Navigator } from './navigator';
import { Coordinates } from '../coordinates';
import { Planet } from '../planet';

export class NavigatorCollidingObstacle implements Navigator {
	constructor(
		private readonly coordinates: Coordinates,
		private readonly planet: Planet,
		private readonly cardinalPoint: CardinalPoint
	) {}

	compass(): CardinalPoint {
		return this.cardinalPoint;
	}

	formattedLocation() {
		return `O ${this.coordinates.toString()} ${this.compass()}`;
	}

	moveBackward(): Navigator {
		return this.navigatorColliding();
	}

	moveForward(): Navigator {
		return this.navigatorColliding();
	}

	rotateLeft(): Navigator {
		return this.navigatorColliding();
	}

	rotateRight(): Navigator {
		return this.navigatorColliding();
	}

	private navigatorColliding() {
		return new NavigatorCollidingObstacle(this.coordinates, this.planet, this.cardinalPoint);
	}
}
