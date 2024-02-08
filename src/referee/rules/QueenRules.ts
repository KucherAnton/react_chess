import { Piece, Position, TeamType, samePosition } from '../../Constants';
import {
	tileIsEmptyOrOccupiedByOpponent,
	tileIsOccupied,
	tileIsOccupiedByOpponent,
} from './GeneralRules';

export const queenMove = (
	initialPosition: Position,
	desiredPosition: Position,
	team: TeamType,
	boardState: Piece[]
): boolean => {
	for (let i = 1; i < 8; i++) {
		let multipierX =
			desiredPosition.x < initialPosition.x
				? -1
				: desiredPosition.x > initialPosition.x
				? 1
				: 0;
		let multipierY =
			desiredPosition.y < initialPosition.y
				? -1
				: desiredPosition.y > initialPosition.y
				? 1
				: 0;

		let passedPosition: Position = {
			x: initialPosition.x + i * multipierX,
			y: initialPosition.y + i * multipierY,
		};
		if (samePosition(passedPosition, desiredPosition)) {
			if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
				return true;
			}
		} else {
			if (tileIsOccupied(passedPosition, boardState)) {
				break;
			}
		}
	}
	return false;
};

export const getPossibleQueenMoves = (
	queen: Piece,
	boardState: Piece[]
): Position[] => {
	const possibleMoves: Position[] = [];

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x + i,
			y: queen.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x - i,
			y: queen.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}
	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x + i,
			y: queen.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x - i,
			y: queen.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x,
			y: queen.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x,
			y: queen.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x + i,
			y: queen.position.y,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 8; i++) {
		const destination: Position = {
			x: queen.position.x - i,
			y: queen.position.y,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, queen.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	return possibleMoves;
};
