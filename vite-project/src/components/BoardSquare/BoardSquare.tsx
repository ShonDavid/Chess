import React, { FunctionComponent, ReactNode } from "react";

type BoardSquareType = {
  row: string | number;
  column: string | number;
  children: ReactNode;
  onClick: any;
  isEven: boolean;
  isChosen: boolean;
  isPossibleMove: boolean;
};

const BoardSquare: FunctionComponent<BoardSquareType> = ({
  row,
  column,
  children,
  onClick,
  isEven,
  isChosen,
  isPossibleMove = false,
}) => {
  return (
    <div
      className={`board-square ${
        isEven ? "board-square--even" : "board-square--odd"
      } ${isChosen ? "board-square--chosen" : ""}`}
      onClick={onClick}
    >
      {children}
      {isChosen ? <div className="board-square__clicked" /> : null}
      {isPossibleMove ? <div className="board-square__possible" /> : null}
      {/* <div className="board-square__row-col">{row + " " + column}</div> */}
    </div>
  );
};

export default BoardSquare;
