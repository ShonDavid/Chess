import React, { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import { ChessColor, ChessState } from "../../utils/types";
import Graveyard from "../Graveyard/Graveyard";
import { resetGame } from "../../context/actions";

const SideMenu = () => {
  const {
    state: { gameState, currentPlayer, waitingPlayer },
    dispatch,
  } = useAppContext();

  return (
    <div className="side-menu">
      <Graveyard color={ChessColor.Black} />
      <div className="side-menu__buttons-menu">
        <button
          onClick={() => dispatch(resetGame())}
          className="side-menu__reset-button"
        >
          Reset Game
        </button>
        <div className="side-menu__player-turn">
          Player Turn: {currentPlayer}
        </div>
        <div className="side-menu__player-turn">
          {gameState === ChessState.Checkmate
            ? `Checkmate! ${waitingPlayer} Won!`
            : `Game State: ${gameState}`}
        </div>
      </div>
      <div className="side-menu__bottom-graveyard">
        <Graveyard color={ChessColor.White} />
      </div>
    </div>
  );
};

export default SideMenu;
