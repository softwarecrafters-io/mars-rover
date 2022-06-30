import { Position } from './marsRover';

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

export class NavigatorFacingNorth implements Navigator {
	compass() {
		return CardinalPoint.North;
	}

	moveForward(position: Position) {
		return new Position(position.x, position.y + 1);
	}

	moveBackward(position: Position) {
		return new Position(position.x, position.y - 1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingEast();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingWest();
	}
}

export class NavigatorFacingEast implements Navigator {
	compass() {
		return CardinalPoint.East;
	}

	moveForward(position: Position) {
		return new Position(position.x + 1, position.y);
	}

	moveBackward(position: Position) {
		return new Position(position.x - 1, position.y);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingSouth();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingNorth();
	}
}

export class NavigatorFacingSouth implements Navigator {
	compass() {
		return CardinalPoint.South;
	}

	moveForward(position: Position) {
		return new Position(position.x, position.y - 1);
	}

	moveBackward(position: Position) {
		return new Position(position.x, position.y + 1);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingWest();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingEast();
	}
}

export class NavigatorFacingWest implements Navigator {
	compass() {
		return CardinalPoint.West;
	}

	moveForward(position: Position) {
		return new Position(position.x - 1, position.y);
	}

	moveBackward(position: Position) {
		return new Position(position.x + 1, position.y);
	}

	rotateRight(): Navigator {
		return new NavigatorFacingNorth();
	}

	rotateLeft(): Navigator {
		return new NavigatorFacingSouth();
	}
}
