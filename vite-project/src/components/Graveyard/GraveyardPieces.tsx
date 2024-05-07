import React, { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import { ChessColor } from "../../utils/types";
import IconTool from "../IconTool/IconTool";
import { chessToolGraveyardOrder } from "../../utils/constants";

const GraveyardPieces = ({ color }) => {
  const {
    state: { playerToolsGraveyard },
  } = useAppContext();

  const graveyardTools = useMemo(() => {
    let tools = playerToolsGraveyard[color].reduce((groups, item, index) => {
      const { type } = item;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(
        <IconTool
          key={index}
          name={item.type}
          fill={ChessColor.Black === color}
          size="small"
        />
      );
      return groups;
    }, {});

    return chessToolGraveyardOrder.reduce((acc, key) => {
      if (tools.hasOwnProperty(key)) {
        return acc.concat(tools[key]);
      } else {
        return acc;
      }
    }, []);
  }, [playerToolsGraveyard]);

  return <div className="graveyard__pieces-container">{graveyardTools}</div>;
};

export default GraveyardPieces;
