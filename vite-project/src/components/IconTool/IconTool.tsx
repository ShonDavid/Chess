import React from "react";
import { ChessTool } from "../../utils/types";
import Knight from "../../assets/icons/Knight";
import "./IconTool.scss";
import Bishop from "../../assets/icons/Bishop";
import King from "../../assets/icons/King";
import Pawn from "../../assets/icons/Pawn";
import Queen from "../../assets/icons/Queen";
import Rook from "../../assets/icons/Rook";

type IconToolProps = {
  name: ChessTool;
};

const IconTool = ({ name, fill = false, size = "big" }) => {
  const iconByName = (name) => {
    switch (name) {
      case ChessTool.Bishop:
        return <Bishop isFilled={fill} />;
      case ChessTool.King:
        return <King isFilled={fill} />;
      case ChessTool.Knight:
        return <Knight isFilled={fill} />;
      case ChessTool.Pawn:
        return <Pawn isFilled={fill} />;
      case ChessTool.Queen:
        return <Queen isFilled={fill} />;
      case ChessTool.Rook:
        return <Rook isFilled={fill} />;
    }
  };
  return <div className={`icon-tool--${size}`}>{iconByName(name)}</div>;
};

export default IconTool;
