import { useEffect, useRef, useState } from 'react';
import {
	Piece,
	PieceType,
	Position,
	TeamType,
	initialBoardState,
	samePosition,
} from '../../Constants';
import Chessboard from '../Chessboard/Chessboard';
import {
	bishopMove,
	getPossibleBishopMoves,
	getPossibleKingMoves,
	getPossibleKnightMoves,
	getPossiblePawnMoves,
	getPossibleQueenMoves,
	getPossibleRookMoves,
	kingMove,
	knightMove,
	pawnMove,
	queenMove,
	rookMove,
} from '../../referee/rules';

export const Referee = () => {
	const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
	const [promotionPawn, setPromotionPawn] = useState<Piece>();
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		updatePossibleMoves();
	});

	const updatePossibleMoves = () => {
		setPieces((currentPieces) => {
			return currentPieces.map((p) => {
				p.possibleMoves = getValidMoves(p, currentPieces);
				return p;
			});
		});
	};

	const playMove = (playedPiece: Piece, destination: Position): boolean => {
		const validMove = isValidMove(
			playedPiece.position,
			destination,
			playedPiece.type,
			playedPiece.team
		);

		const enPassantMove = isEnPassantMove(
			playedPiece.position,
			destination,
			playedPiece.type,
			playedPiece.team
		);

		const pawnDirection = playedPiece.team === TeamType.OUR ? 1 : -1;

		if (enPassantMove) {
			const updatedPieces = pieces.reduce((results, piece) => {
				if (samePosition(piece.position, playedPiece.position)) {
					piece.enPassant = false;
					piece.position.x = destination.x;
					piece.position.y = destination.y;
					results.push(piece);
				} else if (
					!samePosition(piece.position, {
						x: destination.x,
						y: destination.y - pawnDirection,
					})
				) {
					if (piece.type === PieceType.PAWN) {
						piece.enPassant = false;
					}
					results.push(piece);
				}

				return results;
			}, [] as Piece[]);

			updatePossibleMoves();
			setPieces(updatedPieces);
		} else if (validMove) {
			const updatedPieces = pieces.reduce((results, piece) => {
				if (samePosition(piece.position, playedPiece.position)) {
					piece.enPassant =
						Math.abs(playedPiece.position.y - destination.y) === 2 &&
						piece.type === PieceType.PAWN;
					piece.position.x = destination.x;
					piece.position.y = destination.y;

					let promotionRow = piece.team === TeamType.OUR ? 7 : 0;

					if (destination.y === promotionRow && piece.type === PieceType.PAWN) {
						modalRef.current?.classList.remove('hidden');
						setPromotionPawn(piece);
					}
					results.push(piece);
				} else if (
					!samePosition(piece.position, { x: destination.x, y: destination.y })
				) {
					if (piece.type === PieceType.PAWN) {
						piece.enPassant = false;
					}
					results.push(piece);
				}

				return results;
			}, [] as Piece[]);

			updatePossibleMoves();
			setPieces(updatedPieces);
		} else {
			return false;
		}
		return true;
	};

	const isEnPassantMove = (
		initialPosition: Position,
		desiredPosition: Position,
		type: PieceType,
		team: TeamType
	) => {
		const pawnDirection = team === TeamType.OUR ? 1 : -1;

		if (type === PieceType.PAWN) {
			if (
				(desiredPosition.x - initialPosition.x === -1 ||
					desiredPosition.x - initialPosition.x === 1) &&
				desiredPosition.y - initialPosition.y === pawnDirection
			) {
				const piece = pieces.find(
					(p) =>
						p.position.x === desiredPosition.x &&
						p.position.y === desiredPosition.y - pawnDirection &&
						p.enPassant
				);
				if (piece) {
					return true;
				}
			}
		}

		return false;
	};

	const isValidMove = (
		initialPosition: Position,
		desiredPosition: Position,
		type: PieceType,
		team: TeamType
	) => {
		let validMove = false;
		switch (type) {
			case PieceType.PAWN:
				validMove = pawnMove(initialPosition, desiredPosition, team, pieces);
				break;
			case PieceType.KNIGHT:
				validMove = knightMove(initialPosition, desiredPosition, team, pieces);
				break;
			case PieceType.BISHOP:
				validMove = bishopMove(initialPosition, desiredPosition, team, pieces);
				break;
			case PieceType.ROOK:
				validMove = rookMove(initialPosition, desiredPosition, team, pieces);
				break;
			case PieceType.QUEEN:
				validMove = queenMove(initialPosition, desiredPosition, team, pieces);
				break;
			case PieceType.KING:
				validMove = kingMove(initialPosition, desiredPosition, team, pieces);
		}

		return validMove;
	};

	const getValidMoves = (piece: Piece, boardState: Piece[]): Position[] => {
		switch (piece.type) {
			case PieceType.PAWN:
				return getPossiblePawnMoves(piece, boardState);
			case PieceType.KNIGHT:
				return getPossibleKnightMoves(piece, boardState);
			case PieceType.BISHOP:
				return getPossibleBishopMoves(piece, boardState);
			case PieceType.ROOK:
				return getPossibleRookMoves(piece, boardState);
			case PieceType.QUEEN:
				return getPossibleQueenMoves(piece, boardState);
			case PieceType.KING:
				return getPossibleKingMoves(piece, boardState);
			default:
				return [];
		}
	};

	const promotePawn = (pieceType: PieceType) => {
		if (promotionPawn === undefined) {
			return;
		}

		const updatedPieces = pieces.reduce((results, piece) => {
			if (samePosition(piece.position, promotionPawn.position)) {
				const teamType = piece.team === TeamType.OUR ? 'w' : 'b';
				let imageType = '';

				switch (pieceType) {
					case PieceType.ROOK:
						imageType = 'rook';
						break;
					case PieceType.BISHOP:
						imageType = 'bishop';
						break;
					case PieceType.KNIGHT:
						imageType = 'knight';
						break;
					case PieceType.QUEEN:
						imageType = 'queen';
						break;
				}

				piece.type = pieceType;
				piece.image = `assets/${imageType}_${teamType}.png`;
				console.log(piece.image);
			}

			results.push(piece);
			return results;
		}, [] as Piece[]);

		updatePossibleMoves();
		setPieces(updatedPieces);

		modalRef.current?.classList.add('hidden');
	};

	const promotionTeamType = () => {
		return promotionPawn?.team === TeamType.OUR ? 'w' : 'b';
	};

	return (
		<>
			<div id="pawn-promotion-modal" className="hidden" ref={modalRef}>
				<div className="modal-body">
					<img
						onClick={() => promotePawn(PieceType.ROOK)}
						src={`/assets/rook_${promotionTeamType()}.png`}
						alt="Oops, some error!"
					/>
					<img
						onClick={() => promotePawn(PieceType.BISHOP)}
						src={`/assets/bishop_${promotionTeamType()}.png`}
						alt="Oops, some error!"
					/>
					<img
						onClick={() => promotePawn(PieceType.KNIGHT)}
						src={`/assets/knight_${promotionTeamType()}.png`}
						alt="Oops, some error!"
					/>
					<img
						onClick={() => promotePawn(PieceType.QUEEN)}
						src={`/assets/queen_${promotionTeamType()}.png`}
						alt="Oops, some error!"
					/>
				</div>
			</div>
			<Chessboard playMove={playMove} pieces={pieces} />
		</>
	);
};
