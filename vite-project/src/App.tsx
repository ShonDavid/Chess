import React, { FunctionComponent, useEffect } from "react";
import "./style/style.scss";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ChessPage from "./components/ChessPage/ChessPage";
import Modal from "./components/Modal/Modal";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <NavigationBar />
      <ChessPage />
      <Modal />
    </div>
  );
};

export default App;
