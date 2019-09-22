import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

//export const STATE_NAME = "GAME_STATE";

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    currentStepNumber: 0
};

//const persistedState = JSON.parse(sessionStorage.getItem(STATE_NAME));

//const finalInitialState = { ...initialState, ...persistedState };

const gameReducer = (state, action) => {
    switch (action.type) {
        case "ADD_HISTORY":
            return { ...state, history: action.payload };
        case "INCREMENT_STEPNUMBER":
            return { ...state, currentStepNumber: state.currentStepNumber + 1 };
        case "JUMP_TO_TURN":
            return {
                ...state,
                currentStepNumber: action.payload
            };
        case "SET_STATUS":
            return { ...state, status: action.payload };
        case "SET_WINNER":
            return { ...state, win: action.payload };
        case "SORT_HISTORY":
            return { ...state, history: action.payload };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const GameContext = createContext();

export const GameProvider = props => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GameContext.Provider>
    );
};

GameProvider.propTypes = {
    children: PropTypes.element
};
