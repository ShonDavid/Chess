import React from "react";
import Board from "../Board/Board";

const BoardWithPosition = () => {
  return (
    <div className="board-with-position">
      <div className="board-with-position__rows-container">
        <div className="board-with-position__rows">
          {["8", "7", "6", "5", "4", "3", "2", "1"].map((row) => (
            <div className="board-with-position__row" key={row}>
              {row}
            </div>
          ))}
        </div>
        <Board />
      </div>
      <div className="board-with-position__columns">
        {["a", "b", "c", "d", "e", "f", "g", "h"].map((column) => (
          <div className="board-with-position__column" key={column}>
            {column}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardWithPosition;
