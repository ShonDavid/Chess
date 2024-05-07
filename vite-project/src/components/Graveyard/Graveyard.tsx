import React from "react";
import Ghost from "../../assets/icons/Ghost";
import GraveyardPieces from "./GraveyardPieces";

const Graveyard = ({ color }) => {
  return (
    <div className="graveyard">
      <div className={`graveyard__ghost-background--${color}`}>
        <Ghost />
      </div>
      <GraveyardPieces color={color} />
    </div>
  );
};

export default Graveyard;
