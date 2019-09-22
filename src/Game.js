import React, { Component } from "react";
import { GameComponent } from "./components/GameComponent";
import { GameProvider } from "./components/context/GameContext";

class Game extends Component {
    render() {
        return (
            <GameProvider>
                <GameComponent />
            </GameProvider>
        );
    }
}

export default Game;
