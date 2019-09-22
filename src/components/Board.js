import React from "react";
import { Square } from "./Square";

export const Board = ({ squares, winnerSquares, onClick }) => {
    const createBoard = (row, col) => {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(renderSquare(cellCounter++));
            }
            board.push(
                <div key={i} className="board-row">
                    {columns}
                </div>
            );
        }

        return board;
    };

    const renderSquare = i => {
        const winnerClass =
            winnerSquares &&
            (winnerSquares[0] === i ||
                winnerSquares[1] === i ||
                winnerSquares[2] === i)
                ? "square--green"
                : "";

        return (
            <Square
                winnerClass={winnerClass}
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    };

    return <div>{createBoard(3, 3)}</div>;
};
