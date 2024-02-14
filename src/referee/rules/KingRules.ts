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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

		if (
			destination.x < 0 ||
			destination.x > 7 ||
			destination.y < 0 ||
			destination.y > 7
		)
			break;

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

export const getCastlingMoves = (
	king: Piece,
	boardState: Piece[]
): Position[] => {
	const possibleMoves: Position[] = [];

	if (king.hasMoved) return possibleMoves;

	const rooks = boardState.filter(
		(p) => p.isRook && p.team === king.team && !p.hasMoved
	);

	for (const rook of rooks) {
		const direction = rook.position.x - king.position.x > 0 ? 1 : -1;

		const adjacentPosition = king.position.clone();
		adjacentPosition.x += direction;

		if (!rook.possibleMoves?.some((m) => m.samePosition(adjacentPosition)))
			continue;

		const concerningTiles = rook.possibleMoves.filter(
			(m) => m.y === king.position.y
		);
		const enemyPieces = boardState.filter((p) => p.team !== king.team);
		let valid = true;

		for (const enemy of enemyPieces) {
			if (enemy.possibleMoves === undefined) continue;

			for (const move of enemy.possibleMoves) {
				if (concerningTiles.some((t) => t.samePosition(move))) {
					valid = false;
				}

				if (!valid) break;
			}

			if (!valid) break;
		}

		if (!valid) continue;

		possibleMoves.push(rook.position.clone());
	}

	return possibleMoves;
};
