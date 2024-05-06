import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import ChessLottie from "../../assets/lottie/Chess.json";

const GameEndedModal = ({ text, secondaryText = "" }) => {
  return (
    <div className="game-ended-modal">
      <Player
        src={ChessLottie}
        keepLastFrame={true}
        autoplay={true}
        loop={false}
        controls={false}
        style={{ height: "150px", width: "150px" }}
      ></Player>
      <div className="game-ended-modal__text-container">
        <div className="game-ended-modal__text">{text}</div>
        {secondaryText && (
          <div className="game-ended-modal__secondary-text">
            {secondaryText}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameEndedModal;
