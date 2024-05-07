import React from "react";
import SideMenu from "../SideMenu/SideMenu";
import BoardWithPosition from "../BoardWithPosition/BoardWithPosition";
import { ChessColor } from "../../utils/types";
import GraveyardPieces from "../Graveyard/GraveyardPieces";

const ChessPage = () => {
  return (
    <div className="chess-page">
      <div className="chess-page__board-container">
        <div className="chess-page__graveyard-for-mobile">
          <GraveyardPieces color={ChessColor.Black} />
        </div>
        <BoardWithPosition />
        <div className="chess-page__graveyard-for-mobile">
          <GraveyardPieces color={ChessColor.White} />
        </div>
      </div>
      <div className="chess-page__graveyard-container">
        <SideMenu />
      </div>
    </div>
  );
};

export default ChessPage;
