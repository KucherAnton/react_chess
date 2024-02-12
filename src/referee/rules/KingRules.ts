import {
	tileIsEmptyOrOccupiedByOpponent,
	tileIsOccupied,
	tileIsOccupiedByOpponent,
} from './GeneralRules';
import { Piece, Position } from '../../models';
import { TeamType } from '../../Types';

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

	let passedPosition = new Position(
		initialPosition.x + 1 * multipierX,
		initialPosition.y + 1 * multipierY
	);
	if (passedPosition.samePosition(desiredPosition)) {
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
		const destination = new Position(king.position.x + i, king.position.y + i);

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
		const destination = new Position(king.position.x - i, king.position.y + i);

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
		const destination = new Position(king.position.x + i, king.position.y - i);

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
		const destination = new Position(king.position.x - i, king.position.y - i);

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
		const destination = new Position(king.position.x, king.position.y - i);

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
		const destination = new Position(king.position.x, king.position.y + i);

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
		const destination = new Position(king.position.x + i, king.position.y);

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
		const destination = new Position(king.position.x - i, king.position.y);

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
