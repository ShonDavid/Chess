import React from "react";
import Board from "../Board/Board";
import SideMenu from "../SideMenu/SideMenu";
import BoardWithPosition from "../BoardWithPosition/BoardWithPosition";

const ChessPage = () => {
  return (
    <div className="chess-page">
      <div className="chess-page__board-container">
        <BoardWithPosition />
      </div>
      <div className="chess-page__graveyard-container">
        <SideMenu />
      </div>
    </div>
  );
};

export default ChessPage;
