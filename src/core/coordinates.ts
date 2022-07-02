export class Coordinates {
	private constructor(readonly latitude: number, readonly longitude: number) {}

	static create(latitude: number, longitude: number) {
		if (latitude < 0 || longitude < 0) {
			throw new Error('Negative numbers are not allowed');
		}
		return new Coordinates(latitude, longitude);
	}

	static createFrom(latitude: string, longitude: string) {
		const parsedLatitude = Number.parseInt(latitude);
		const parsedLongitude = Number.parseInt(longitude);
		if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
			throw new Error('Malformed coordinates');
		}
		return Coordinates.create(parsedLatitude, parsedLongitude);
	}

	increaseLatitude(stepSize: number) {
		return new Coordinates(this.latitude + stepSize, this.longitude);
	}

	increaseLongitude(stepSize: number) {
		return new Coordinates(this.latitude, this.longitude + stepSize);
	}

	toString() {
		return `${this.latitude} ${this.longitude}`;
	}

	isBoundaryLongitude(boundaryCoordinates: Coordinates) {
		return this.longitude === boundaryCoordinates.longitude;
	}

	isBoundaryLatitude(boundaryCoordinates: Coordinates) {
		return this.latitude === boundaryCoordinates.latitude;
	}

	isInitialLongitude() {
		return this.longitude === 0;
	}

	isInitialLatitude() {
		return this.latitude === 0;
	}
}
