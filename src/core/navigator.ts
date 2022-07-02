import { Position } from './position';

enum CardinalPoint {
	North = 'N',
	South = 'S',
	East = 'E',
	West = 'W',
}

export interface Navigator {
	moveForward(position: Position): Position;
	moveBackward(position: Position): Position;
	compass(): CardinalPoint;
	rotateRight(): Navigator;
	rotateLeft(): Navigator;
}

export class NavigatorFactory {
	static createFrom(orientation: string) {
		switch (orientation) {
			case CardinalPoint.North:
				return new NavigatorFacingNorth();
			case CardinalPoint.East:
				return new NavigatorFacingEast();
			case CardinalPoint.South:
				return new NavigatorFacingSouth();
			case CardinalPoint.West:
				return new NavigatorFacingWest();
			default:
				throw new Error('Unsupported orientation');
		}
	}
}

export class NavigatorFacingNorth implements Navigator {
	compass() {
		return CardinalPoint.North;
	}

	moveForward(position: Position) {
		return position.increaseY(1);
	}

	moveBackward(position: Position) {
		return position.increaseY(-1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingEast();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingWest();
	}
}

export class NavigatorFacingSouth implements Navigator {
	compass() {
		return CardinalPoint.South;
	}

	moveForward(position: Position) {
		return position.increaseY(-1);
	}

	moveBackward(position: Position) {
		return position.increaseY(1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingWest();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingEast();
	}
}

export class NavigatorFacingEast implements Navigator {
	compass() {
		return CardinalPoint.East;
	}

	moveForward(position: Position) {
		return position.increaseX(1);
	}

	moveBackward(position: Position) {
		return position.increaseX(-1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingSouth();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingNorth();
	}
}

export class NavigatorFacingWest implements Navigator {
	compass() {
		return CardinalPoint.West;
	}

	moveForward(position: Position) {
		return position.increaseX(-1);
	}

	moveBackward(position: Position) {
		return position.increaseX(1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingNorth();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingSouth();
	}
}
