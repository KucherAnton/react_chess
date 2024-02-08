import { Piece, Position, TeamType, samePosition } from '../../Constants';
import {
	tileIsEmptyOrOccupiedByOpponent,
	tileIsOccupied,
	tileIsOccupiedByOpponent,
} from './GeneralRules';

export const kingMove = (
	initialPosition: Position,
	desiredPosition: Position,
	team: TeamType,
	boardState: Piece[]
): boolean => {
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
		x: initialPosition.x + 1 * multipierX,
		y: initialPosition.y + 1 * multipierY,
	};
	if (samePosition(passedPosition, desiredPosition)) {
		if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
			return true;
		}
	} else {
		if (tileIsOccupied(passedPosition, boardState)) {
			return false;
		}
	}
	return false;
};

export const getPossibleKingMoves = (
	king: Piece,
	boardState: Piece[]
): Position[] => {
	const possibleMoves: Position[] = [];

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x + i,
			y: king.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x - i,
			y: king.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}
	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x + i,
			y: king.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x - i,
			y: king.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x,
			y: king.position.y - i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x,
			y: king.position.y + i,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x + i,
			y: king.position.y,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	for (let i = 1; i < 2; i++) {
		const destination: Position = {
			x: king.position.x - i,
			y: king.position.y,
		};

		if (!tileIsOccupied(destination, boardState)) {
			possibleMoves.push(destination);
		} else if (tileIsOccupiedByOpponent(destination, boardState, king.team)) {
			possibleMoves.push(destination);
			break;
		} else {
			break;
		}
	}

	return possibleMoves;
};
