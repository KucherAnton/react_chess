import React, { useEffect, useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

interface Piece {
	image: string;
	x: number;
	y: number;
}

const initialBoardState: Piece[] = [];

for (let p = 0; p < 2; p++) {
	const type = p === 0 ? 'b' : 'w';
	const y = p === 0 ? 7 : 0;

	initialBoardState.push({ image: `assets/rook_${type}.png`, x: 0, y });
	initialBoardState.push({ image: `assets/rook_${type}.png`, x: 7, y });
	initialBoardState.push({ image: `assets/knight_${type}.png`, x: 1, y });
	initialBoardState.push({ image: `assets/knight_${type}.png`, x: 6, y });
	initialBoardState.push({ image: `assets/bishop_${type}.png`, x: 2, y });
	initialBoardState.push({ image: `assets/bishop_${type}.png`, x: 5, y });
	initialBoardState.push({ image: `assets/queen_${type}.png`, x: 3, y });
	initialBoardState.push({ image: `assets/king_${type}.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
	initialBoardState.push({ image: 'assets/pawn_b.png', x: i, y: 6 });
}

for (let i = 0; i < 8; i++) {
	initialBoardState.push({ image: 'assets/pawn_w.png', x: i, y: 1 });
}

const Chessboard = () => {
	const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
	const chessboardRef = useRef<HTMLDivElement>(null);

	let activePiece: HTMLElement | null = null;

	const grabPiece = (e: React.MouseEvent) => {
		const element = e.target as HTMLElement;

		if (element.classList.contains('chess-piece')) {
			const x = e.clientX - 40;
			const y = e.clientY - 40;
			element.style.position = 'absolute';
			element.style.left = `${x}px`;
			element.style.top = `${y}px`;

			activePiece = element;
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
			// activePiece.style.left = `${x}px`;
			// activePiece.style.top = `${y}px`;

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
		if (activePiece) {
			activePiece = null;
		}
	};

	let board = [];

	for (let j = verticalAxis.length - 1; j >= 0; j--) {
		for (let i = 0; i < horizontalAxis.length; i++) {
			const number = i + j + 2;
			let image = '';

			pieces.forEach((p) => {
				if (p.x === i && p.y === j) {
					image = p.image;
				}
			});

			board.push(<Tile key={`${j},${i}`} number={number} image={image} />);
		}
	}

	return (
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
	);
};

export default Chessboard;
