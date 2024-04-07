import React, { FunctionComponent } from "react";
import Board from "./components/Board/Board";
import "./App.scss";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <Board />
    </div>
  );
};

export default App;
