import React, { useMemo } from "react";
import { useAppContext } from "../../context/AppContext";
import { ChessColor } from "../../utils/types";
import IconTool from "../IconTool/IconTool";
import { chessToolGraveyardOrder } from "../../utils/constants";
import Ghost from "../../assets/icons/Ghost";

const Graveyard = ({color, tools}) => {

  const graveyardTools = useMemo(() => 
    chessToolGraveyardOrder.map((tool, index) => {
      if (!tools[tool]) return null;
      return tools[tool].map((item, index) => (
        <IconTool
          key={index}
          name={item.type}
          fill={ChessColor.Black === color}
          size="small"
        />
      ));
    })
    , [tools])

  return (
      <div className="graveyard">
        <div className={`graveyard__ghost-background--${color}`}>
          <Ghost />
        </div>
        <div className="graveyard__pieces-container">
          {graveyardTools}
        </div>
      </div>
  );
};

export default Graveyard;
