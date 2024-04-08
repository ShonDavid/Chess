import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { chessBoard, rowsInBoard } from "../../utils/constants";
import BoardSquare from "../BoardSquare/BoardSquare";
import { setPossibleOptions, onClickSquare } from "../../context/actions";
import { PlayerTurn } from "../../utils/types";
import "./Board.scss";
import IconTool from "../IconTool/IconTool";

const Board = () => {
  const { state, dispatch } = useAppContext();
  const { playersTools, currentPlayer, possibleOptions, chosenTool } = state;

  useEffect(() => {
    dispatch(setPossibleOptions());
  }, [currentPlayer]);

  useEffect(() => {
    console.log("lol=", possibleOptions);
  }, [possibleOptions]);

  return (
    <div className="board-container">
      <div className="board" key="lol">
        {chessBoard.map((col, colIndex) => (
          <div className="board__col" key={colIndex}>
            {col.map((_, rowIndex) => {
              let columnBoard = rowsInBoard[rowIndex];
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
                  {colRow in playersTools[PlayerTurn.Player1] ? (
                    <IconTool
                      name={playersTools[PlayerTurn.Player1][colRow].type}
                    />
                  ) : null}
                  {colRow in playersTools[PlayerTurn.Player2] ? (
                    <IconTool
                      name={playersTools[PlayerTurn.Player2][colRow].type}
                      fill={true}
                    />
                  ) : null}
                </BoardSquare>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
