import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { chessBoard, colsInBoard } from "../../utils/constants";
import BoardSquare from "../BoardSquare/BoardSquare";
import {
  setPossibleOptions,
  onClickSquare,
  setIsKingUnderAttack,
} from "../../context/actions";
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
    dispatch(setIsKingUnderAttack());
  }, [possibleOptions]);

  return (
    <div className="board-container">
      <div className="board" key="lol">
        {chessBoard.map((col, colIndex) => (
          <div className="board__col" key={colIndex}>
            {col.map((_, rowIndex) => {
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
                  {colRow in playersTools[PlayerTurn.White] ? (
                    <IconTool
                      name={playersTools[PlayerTurn.White][colRow].type}
                    />
                  ) : null}
                  {colRow in playersTools[PlayerTurn.Black] ? (
                    <IconTool
                      name={playersTools[PlayerTurn.Black][colRow].type}
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
