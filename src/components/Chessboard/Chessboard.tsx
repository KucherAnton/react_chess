import React, { useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';
import { VERTICAL_AXIS, HORIZONTAL_AXIS, GRID_SIZE } from '../../Constants';
import { Piece, Position } from '../../models';

interface Props {
	playMove: (piece: Piece, position: Position) => boolean;
	pieces: Piece[];
}

const Chessboard = ({ playMove, pieces }: Props) => {
	const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
	const [grabPosition, setGrabPosition] = useState<Position>(
		new Position(-1, -1)
	);
	const chessboardRef = useRef<HTMLDivElement>(null);

	const grabPiece = (e: React.MouseEvent) => {
		const element = e.target as HTMLElement;
		const chessboard = chessboardRef.current;

		if (element.classList.contains('chess-piece') && chessboard) {
			const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
			const grabY = Math.abs(
				Math.ceil((e.clientY - chessboard.offsetTop - 640) / GRID_SIZE)
			);

			setGrabPosition(new Position(grabX, grabY));

			const x = e.clientX - GRID_SIZE / 2;
			const y = e.clientY - GRID_SIZE / 2;

			element.style.position = 'absolute';
			element.style.left = `${x}px`;
			element.style.top = `${y}px`;

			setActivePiece(element);
		}
	};

	const movePiece = (e: React.MouseEvent) => {
		const chessboard = chessboardRef.current;

		if (activePiece && chessboard) {
			const minX = chessboard.offsetLeft - 20;
			const minY = chessboard.offsetTop - 20;
			const maxX = chessboard.offsetLeft + chessboard.clientWidth - 65;
			const maxY = chessboard.offsetTop + chessboard.clientHeight - 65;
			const x = e.clientX - 40;
			const y = e.clientY - 40;
			activePiece.style.position = 'absolute';

			if (x < minX) {
				activePiece.style.left = `${minX}px`;
			} else if (x > maxX) {
				activePiece.style.left = `${maxX}px`;
			} else {
				activePiece.style.left = `${x}px`;
			}

			if (y < minY) {
				activePiece.style.top = `${minY}px`;
			} else if (y > maxY) {
				activePiece.style.top = `${maxY}px`;
			} else {
				activePiece.style.top = `${y}px`;
			}
		}
	};

	const dropPiece = (e: React.MouseEvent) => {
		const chessboard = chessboardRef.current;
		if (activePiece && chessboard) {
			const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
			const y = Math.abs(
				Math.ceil((e.clientY - chessboard.offsetTop - 640) / GRID_SIZE)
			);

			const currentPiece = pieces.find((p) => p.samePosition(grabPosition));

			// if (currentPiece === undefined) {
			// 	activePiece.style.position = 'relative';
			// 	activePiece.style.removeProperty('top');
			// 	activePiece.style.removeProperty('left');
			// }

			if (currentPiece) {
				let success = playMove(currentPiece.clone(), new Position(x, y));

				if (!success) {
					activePiece.style.position = 'relative';
					activePiece.style.removeProperty('top');
					activePiece.style.removeProperty('left');
				}
			}

			setActivePiece(null);
		}
	};

	let board = [];

	for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
		for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
			const number = i + j + 2;
			const piece = pieces.find((p) => p.samePosition(new Position(i, j)));
			let image = piece ? piece.image : '';

			let currentPiece =
				activePiece != null
					? pieces.find((p) => {
							return p.samePosition(grabPosition);
					  })
					: undefined;
			let highlight = currentPiece?.possibleMoves
				? currentPiece.possibleMoves.some((p) => {
						return p.samePosition(new Position(i, j));
				  })
				: false;

			board.push(
				<Tile
					key={`${j},${i}`}
					number={number}
					image={image}
					highlight={highlight}
				/>
			);
		}
	}

	return (
		<>
			<div
				onMouseMove={(e) => {
					movePiece(e);
				}}
				onMouseDown={(e) => {
					grabPiece(e);
				}}
				onMouseUp={(e) => {
					dropPiece(e);
				}}
				id="chessboard"
				ref={chessboardRef}>
				{board}
			</div>
		</>
	);
};

export default Chessboard;

// Collision with the board
// Promotion error
// Refactoring
// Fixing async move
// add check
// add stalemate
