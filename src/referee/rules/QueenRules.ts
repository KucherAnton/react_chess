import { Piece, Position, TeamType, samePosition } from '../../Constants';
import {
	tileIsEmptyOrOccupiedByOpponent,
	tileIsOccupied,
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
