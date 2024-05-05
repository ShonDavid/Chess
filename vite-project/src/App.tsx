import React, { FunctionComponent } from "react";
import Board from "./components/Board/Board";
import "./App.scss";
import Graveyard from "./components/Graveyard/Graveyard";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <div className="board-container">
        <Board />
      </div>
      <div className="graveyard-container">
        <Graveyard />
      </div>
    </div>
  );
};

export default App;
