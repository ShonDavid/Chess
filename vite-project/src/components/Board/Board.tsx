import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { chessBoard, colsInBoard } from "../../utils/constants";
import BoardSquare from "../BoardSquare/BoardSquare";
import { onClickSquare } from "../../context/actions";
import { ChessColor } from "../../utils/types";
import IconTool from "../IconTool/IconTool";

const Board = () => {
  const { state, dispatch } = useAppContext();

  const { playersTools, possibleOptions, chosenTool, playHistory } = state;

  useEffect(() => {
    console.log("playHistory", playHistory);
  }, [playHistory]);

  return (
    <div className="board" key="board-chess">
      <div className="board-content" key="board-chess">
        {chessBoard.map((col, colIndex) =>
          col.map((_, rowIndex) => {
            let columnBoard = colsInBoard[rowIndex];
            let rowBoard = 8 - colIndex;
            let colRow = `${columnBoard}_${rowBoard}`;
            let isPossibleMove = !!(
              chosenTool &&
              chosenTool in possibleOptions &&
              colRow in possibleOptions[chosenTool]
            );
            return (
              <BoardSquare
                isEven={(rowIndex + colIndex) % 2 === 0}
                isChosen={colRow === chosenTool}
                column={columnBoard}
                row={rowBoard}
                key={colRow}
                onClick={() => dispatch(onClickSquare(colRow))}
                isPossibleMove={isPossibleMove}
              >
                {colRow in playersTools[ChessColor.White] ? (
                  <IconTool
                    name={playersTools[ChessColor.White][colRow].type}
                  />
                ) : null}
                {colRow in playersTools[ChessColor.Black] ? (
                  <IconTool
                    name={playersTools[ChessColor.Black][colRow].type}
                    fill={true}
                  />
                ) : null}
              </BoardSquare>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Board;
