import React, { useMemo } from "react";
import "./Graveyard.scss";
import { useAppContext } from "../../context/AppContext";
import { ChessColor } from "../../utils/types";
import IconTool from "../IconTool/IconTool";
import { chessToolGraveyardOrder } from "../../utils/constants";

const Graveyard = () => {
  const { state, dispatch } = useAppContext();
  const { playerToolsGraveyard } = state;

  const graveyardCounter = useMemo(() => {
    let graveyardToReturn = {};
    Object.keys(playerToolsGraveyard).map(
      (key) =>
        (graveyardToReturn[key] = playerToolsGraveyard[key].reduce(
          (groups, item) => {
            const { type } = item;
            if (!groups[type]) {
              groups[type] = [];
            }
            groups[type].push(item);
            return groups;
          },
          {}
        ))
    );
    return graveyardToReturn;
  }, [playerToolsGraveyard]);

  console.log(graveyardCounter);

  const graveyardByColor = (color: ChessColor) => {
    return chessToolGraveyardOrder.map((tool, index) => {
      if (!graveyardCounter[color][tool]) return null;
      return graveyardCounter[color][tool].map((item, index) => (
        <IconTool
          key={index}
          name={item.type}
          fill={ChessColor.Black === color}
          size="small"
        />
      ));
    });
  };

  return (
    <div className="graveyard">
      <div className="graveyard__top-pieces">
        <div className="graveyard__pieces-container">
          {graveyardByColor(ChessColor.Black)}
        </div>
      </div>
      <div className="graveyard__bottom-pieces">
        <div className="graveyard__pieces-container">
          {graveyardByColor(ChessColor.White)}
        </div>
      </div>
    </div>
  );
};

export default Graveyard;
