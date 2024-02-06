import { Piece, Position, TeamType, samePosition } from '../../Constants';
import {
	tileIsEmptyOrOccupiedByOpponent,
	tileIsOccupied,
} from './GeneralRules';

export const bishopMove = (
	initialPosition: Position,
	desiredPosition: Position,
	team: TeamType,
	boardState: Piece[]
): boolean => {
	for (let i = 1; i < 8; i++) {
		if (
			desiredPosition.x > initialPosition.x &&
			desiredPosition.y > initialPosition.y
		) {
			let passedPosition: Position = {
				x: initialPosition.x + i,
				y: initialPosition.y + i,
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

		if (
			desiredPosition.x > initialPosition.x &&
			desiredPosition.y < initialPosition.y
		) {
			let passedPosition: Position = {
				x: initialPosition.x + i,
				y: initialPosition.y - i,
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

		if (
			desiredPosition.x < initialPosition.x &&
			desiredPosition.y < initialPosition.y
		) {
			let passedPosition: Position = {
				x: initialPosition.x - i,
				y: initialPosition.y - i,
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

		if (
			desiredPosition.x < initialPosition.x &&
			desiredPosition.y > initialPosition.y
		) {
			let passedPosition: Position = {
				x: initialPosition.x - i,
				y: initialPosition.y + i,
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
	}
	return false;
};
