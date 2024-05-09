import React, { FunctionComponent, useEffect } from "react";
import "./style/style.scss";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import ChessPage from "./components/ChessPage/ChessPage";
import Modal from "./components/Modal/Modal";
import Credits from "./components/Credits/Credits";

const App: FunctionComponent = () => {
  return (
    <div className="app">
      <div className="app__background" />
      <NavigationBar />
      <ChessPage />
      <Modal />
      <Credits />
    </div>
  );
};

export default App;
