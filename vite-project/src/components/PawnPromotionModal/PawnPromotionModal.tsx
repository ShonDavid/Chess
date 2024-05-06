import React from "react";
import { chessToolPromotionPawn } from "../../utils/constants";
import IconTool from "../IconTool/IconTool";
import { ChessColor } from "../../utils/types";

const PawnPromotionModal = ({currentPlayer, onClickPromotion}) => {
  return (
    <div className="pawn-promotion-modal">
      <div className="pawn-promotion-modal__header">
        Please choose a tool to promote your pawn
      </div>
      <div className="pawn-promotion-modal__tools">
        {chessToolPromotionPawn.map((tool) => (
          <button
            key={`promotion-${tool}-button`}
            className="pawn-promotion-modal__tool-button"
            onClick={() => onClickPromotion(tool)}
          >
            <IconTool
              key={`promotion-${tool}-icon`}
              name={tool}
              fill={ChessColor.Black === currentPlayer}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PawnPromotionModal;
