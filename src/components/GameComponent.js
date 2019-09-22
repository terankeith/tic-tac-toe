import React, { useContext, useState, useEffect, useCallback } from "react";
import { Board } from "./Board";
import { GameContext } from "./context/GameContext";

export const GameComponent = () => {
    const { state, dispatch } = useContext(GameContext);
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner] = useState();
    const [status, setStatus] = useState();
    const [moves, setMoves] = useState();
    const currentTurn = state.history[state.currentStepNumber];

    const getLocation = move => {
        const locationMap = {
            0: "row: 1, col: 1",
            1: "row: 1, col: 2",
            2: "row: 1, col: 3",
            3: "row: 2, col: 1",
            4: "row: 2, col: 2",
            5: "row: 2, col: 3",
            6: "row: 3, col: 1",
            7: "row: 3, col: 2",
            8: "row: 3, col: 3"
        };

        return locationMap[move];
    };

    const calculateWinner = squares => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i += 1) {
            const [a, b, c] = lines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return { winner: squares[a], winnerRow: lines[i] };
            }
        }

        return { winner: null, winnerRow: null };
    };

    const jumpTo = useCallback(
        step => {
            dispatch({
                type: "JUMP_TO_TURN",
                payload: step
            });
            setXIsNext(step % 2 === 0);
        },
        [dispatch]
    );

    useEffect(() => {
        setWinner(calculateWinner(currentTurn.squares));
    }, [currentTurn.squares]);

    useEffect(() => {
        if (winner && winner.winner) {
            setStatus(`Winner ${winner.winner}`);
        } else if (state.history.length === 10) {
            setStatus("Draw. No one won.");
        } else {
            setStatus(`Next player: ${xIsNext ? "X" : "O"}`);
        }
    }, [winner, state.history.length, xIsNext]);

    useEffect(() => {
        setMoves(
            state.history.map((step, move) => {
                const currentLocation = step.currentLocation
                    ? `(${step.currentLocation})`
                    : "";
                const desc = step.stepNumber
                    ? `Go to move #${step.stepNumber}`
                    : "Go to game start";
                const classButton =
                    move === state.currentStepNumber ? "button--green" : "";

                return (
                    <li key={step.stepNumber}>
                        <button
                            className={`${classButton} button`}
                            onClick={() => jumpTo(move)}
                        >
                            {`${desc} ${currentLocation}`}
                        </button>
                    </li>
                );
            })
        );
    }, [state.history, jumpTo, state.currentStepNumber]);

    const sortHistory = () => {
        let reverseHistory = state.history.slice().reverse();
        dispatch({ type: "SORT_HISTORY", payload: reverseHistory });
    };

    const handleClick = i => {
        let history = state.history.slice(0, state.currentStepNumber + 1);
        let squares = currentTurn.squares.slice();

        if ((winner && winner.winner) || squares[i]) {
            alert("entered if statement");
            return;
        }

        squares[i] = xIsNext ? "X" : "O";

        history = history.concat([
            {
                squares,
                currentLocation: getLocation(i),
                stepNumber: history.length
            }
        ]);

        dispatch({ type: "ADD_HISTORY", payload: history });
        setXIsNext(!xIsNext);
        dispatch({ type: "INCREMENT_STEPNUMBER" });
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={currentTurn.squares}
                    winnerSquares={winner ? winner.winnerRow : ""}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button className="button" onClick={sortHistory}>
                    Sort moves
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    );
};
