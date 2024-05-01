import { ColsInBoard, colsInBoard } from "./constants";
import { ChessTool, ChessColor } from "./types";

const convertRowAndColToKey = (col: number, row: number) => {
  const colString = colsInBoard[col];
  const rowString = row + 1;
  return `${colString}_${rowString}`;
};

// const getPossibleOptions = (
//   currentPlayerTools,
//   waitingPlayerTools,
//   type,
//   col,
//   row,
//   path = null
// ) => {};

export const pawnPossiblePath = (params) => {
  const paths: any = {};
  const {
    path,
    col,
    row,
    currentPlayerTools,
    waitingPlayerTools,
    currentPlayerSpecialInformation,
    waitingPlayerSpecialInformation,
  } = params;

  const direction = path === ChessColor.White ? 1 : -1;

  // Forward movement
  const forwardMove: any = convertRowAndColToKey(col, row + direction);
  if (
    !(forwardMove in waitingPlayerTools) &&
    !(forwardMove in currentPlayerTools)
  ) {
    paths[forwardMove] = true;

    // Initial two-square forward move
    const forwardMove2: any = convertRowAndColToKey(col, row + 2 * direction);

    if (
      !currentPlayerSpecialInformation.pawnMoved[ColsInBoard[col]] &&
      !(forwardMove2 in waitingPlayerTools) &&
      !(forwardMove2 in currentPlayerTools)
    ) {
      paths[forwardMove2] = true;
    }
  }

  // Diagonal captures
  const diagonalDirectionleft = convertRowAndColToKey(col - 1, row + direction);
  if (waitingPlayerTools[diagonalDirectionleft]) {
    paths[diagonalDirectionleft] = true;
  }
  const diagonalDirectionRight = convertRowAndColToKey(
    col + 1,
    row + direction
  );
  if (waitingPlayerTools[diagonalDirectionRight]) {
    paths[diagonalDirectionRight] = true;
  }
  // en passant move
  const passantLeft = convertRowAndColToKey(col - 1, row);
  const passantRight = convertRowAndColToKey(col + 1, row);
  if (
    passantLeft in waitingPlayerTools &&
    !(diagonalDirectionleft in currentPlayerTools) &&
    waitingPlayerSpecialInformation.pawnMovedTwiceNow === passantLeft
  ) {
    paths[diagonalDirectionleft] = true;
  }
  if (
    passantRight in waitingPlayerTools &&
    !(diagonalDirectionRight in currentPlayerTools) &&
    waitingPlayerSpecialInformation.pawnMovedTwiceNow === passantRight
  ) {
    paths[diagonalDirectionRight] = true;
  }
  return paths;
};

export const knightPossibleMove = (params) => {
  const paths: any = {};
  const { col, row, currentPlayerTools } = params;
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ];
  directions.map(([dx, dy]) => {
    const newCol = col + dx;
    const newRow = row + dy;
    const colRow = convertRowAndColToKey(newCol, newRow);
    if (
      newCol >= 0 &&
      newCol <= 7 &&
      newRow >= 0 &&
      newRow <= 7 &&
      !(colRow in currentPlayerTools)
    ) {
      paths[colRow] = true;
    }
  });
  return paths;
};

export const rookPossibleMove = (params) => {
  const paths: any = {};
  const { col, row, currentPlayerTools, waitingPlayerTools } = params;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  directions.map(([dx, dy]) => {
    for (let index = 1; index <= 8; index++) {
      const newCol = col + dx * index;
      const newRow = row + dy * index;
      const colRow = convertRowAndColToKey(newCol, newRow);
      if (
        colRow in currentPlayerTools ||
        newCol < 0 ||
        newCol > 7 ||
        newRow < 0 ||
        newRow > 7
      ) {
        break;
      } else if (colRow in waitingPlayerTools) {
        paths[colRow] = true;
        break;
      } else {
        paths[colRow] = true;
      }
    }
  });
  return paths;
};

export const bishopPossibleMove = (params) => {
  const paths: any = {};
  const { col, row, currentPlayerTools, waitingPlayerTools } = params;

  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  directions.map(([dx, dy]) => {
    for (let index = 1; index <= 8; index++) {
      const newCol = col + dx * index;
      const newRow = row + dy * index;
      const colRow = convertRowAndColToKey(newCol, newRow);
      if (
        colRow in currentPlayerTools ||
        newCol < 0 ||
        newCol > 7 ||
        newRow < 0 ||
        newRow > 7
      ) {
        break;
      } else if (colRow in waitingPlayerTools) {
        paths[colRow] = true;
        break;
      } else {
        paths[colRow] = true;
      }
    }
  });
  return paths;
};

export const queenPossibleMove = (params) => {
  const paths: any = {};
  const { col, row, currentPlayerTools, waitingPlayerTools } = params;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  directions.map(([dx, dy]) => {
    for (let index = 1; index <= 8; index++) {
      const newCol = col + dx * index;
      const newRow = row + dy * index;
      const colRow = convertRowAndColToKey(newCol, newRow);
      if (
        colRow in currentPlayerTools ||
        newCol < 0 ||
        newCol > 7 ||
        newRow < 0 ||
        newRow > 7
      ) {
        break;
      } else if (colRow in waitingPlayerTools) {
        paths[colRow] = true;
        break;
      } else {
        paths[colRow] = true;
      }
    }
  });
  return paths;
};

export const kingPossibleMove = (params) => {
  const paths: any = {};
  const {
    col,
    row,
    path,
    currentPlayerTools,
    waitingPlayerTools,
    currentPlayerSpecialInformation,
  } = params;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  directions.map(([dx, dy]) => {
    const newCol = col + dx;
    const newRow = row + dy;
    const colRow = convertRowAndColToKey(newCol, newRow);
    if (
      colRow in currentPlayerTools ||
      newCol < 0 ||
      newCol > 7 ||
      newRow < 0 ||
      newRow > 7
    ) {
      return;
    } else if (colRow in waitingPlayerTools) {
      paths[colRow] = true;
    } else {
      paths[colRow] = true;
    }
  });

  if (!currentPlayerSpecialInformation.kingMoved) {
    let rightCastling = currentPlayerSpecialInformation.rookMoved.h;
    let leftCastling = currentPlayerSpecialInformation.rookMoved.a;
    for (let index = 1; index <= 3; index++) {
      if (index <= 2) {
        if (
          convertRowAndColToKey(col + index, row) in waitingPlayerTools ||
          convertRowAndColToKey(col + index, row) in currentPlayerTools
        ) {
          rightCastling = false;
        }
      }
      if (index <= 3) {
        if (
          convertRowAndColToKey(col - index, row) in waitingPlayerTools ||
          convertRowAndColToKey(col - index, row) in currentPlayerTools
        ) {
          leftCastling = false;
        }
      }
    }

    if (leftCastling) {
      paths[convertRowAndColToKey(col - 2, row)] = true;
    }

    if (rightCastling) {
      paths[convertRowAndColToKey(col + 2, row)] = true;
    }
  }

  return paths;
};

export const toolSpecialInformation = (
  colRowCurrent,
  colRowDestination,
  type,
  specialCases
) => {
  let [curCol, curRow] = colRowCurrent.split("_");
  let [destinationCol, destinationRow] = colRowDestination.split("_");

  switch (type) {
    case ChessTool.Pawn:
      return {
        ...specialCases,
        neverMoved: false,
        movedByTwo:
          curCol === destinationCol &&
          (parseInt(curRow) === parseInt(destinationRow) - 2 ||
            parseInt(curRow) === parseInt(destinationRow) + 2),
      };
    case ChessTool.Rook:
      return { ...specialCases, neverMoved: false };
    case ChessTool.King:
      return { ...specialCases, neverMoved: false };
    default:
      return false;
  }
};

//Any time the user move a piece, we need to remove the movedByTwo flag on all the pawns.
//En-passant can happen only on the first move of the pawn.
export const removeAllMovedbyTwo = (playerTools) => {
  const newPlayerTools = { ...playerTools };
  Object.keys(newPlayerTools).forEach((key) => {
    if (newPlayerTools[key]?.specialCases?.movedByTwo) {
      newPlayerTools[key].specialCases.movedByTwo = false;
    }
  });
  return newPlayerTools;
};

export const shouldKillPawnPassant = (
  colRowCurrent,
  ColRowDestination,
  currentPlayerTools,
  waitingPlayerTools
) => {
  let [col, row] = colRowCurrent.split("_");
  col = ColsInBoard[col];
  row = parseInt(row) - 1;

  if (currentPlayerTools[colRowCurrent].type !== ChessTool.Pawn) {
    return false;
  }

  const direction =
    currentPlayerTools[colRowCurrent].path === ChessColor.White ? 1 : -1;

  const diagonalDirectionleft = convertRowAndColToKey(col - 1, row + direction);
  const diagonalDirectionRight = convertRowAndColToKey(
    col + 1,
    row + direction
  );
  const pawnLeftToKill = convertRowAndColToKey(col - 1, row);
  const pawnRightToKill = convertRowAndColToKey(col + 1, row);
  if (
    pawnLeftToKill in waitingPlayerTools &&
    waitingPlayerTools[pawnLeftToKill].specialCases.movedByTwo &&
    ColRowDestination === diagonalDirectionleft
  ) {
    return pawnLeftToKill;
  } else if (
    pawnRightToKill in waitingPlayerTools &&
    waitingPlayerTools[pawnRightToKill].specialCases.movedByTwo &&
    ColRowDestination === diagonalDirectionRight
  ) {
    return pawnRightToKill;
  } else {
    return false;
  }
};

export const killSetPiece = (pieceToKill, playerPieces) => {
  let newPlayerPieces = { ...playerPieces };
  delete newPlayerPieces[pieceToKill];
  return newPlayerPieces;
};

export const moveSetPieceChangeName = (
  colRowCurrent,
  colRowDestination,
  playerTools
) => {
  let newPlayerTools = { ...playerTools };
  newPlayerTools[colRowDestination] = newPlayerTools[colRowCurrent];
  delete newPlayerTools[colRowCurrent];
  return newPlayerTools;
};

export const killSetPieceAndAddToGraveyard = (
  pieceToKill,
  playerPieces,
  graveyardPieces
) => {
  let newPlayerPieces = { ...playerPieces };
  let newGraveyardPieces = [...graveyardPieces, playerPieces[pieceToKill]];
  delete newPlayerPieces[pieceToKill];
  return [newPlayerPieces, newGraveyardPieces];
};

export const changeSpecialInformation = (
  playerPieces,
  playerSpecialInformation,
  colRowCurrent,
  colRowDestination
) => {
  const newPlayerSpecialInformation = { ...playerSpecialInformation };
  let [curCol, curRow] = colRowCurrent.split("_");
  let [destinationCol, destinationRow] = colRowDestination.split("_");
  if (playerPieces[colRowCurrent].type === ChessTool.Pawn) {
    newPlayerSpecialInformation.pawnMoved[ColsInBoard[curCol]] = true;
    if (Math.abs(parseInt(curRow) - parseInt(destinationRow)) === 2) {
      newPlayerSpecialInformation.pawnMovedTwiceNow = colRowDestination;
    }
  }
  return newPlayerSpecialInformation;
};

export const moveSetPiece = (
  playersTools,
  currentPlayer,
  waitingPlayer,
  playerToolsGraveyard,
  colRowCurrent,
  colRowDestination,
  colRowToKill
) => {
  let currentPlayerTools = playersTools[currentPlayer];
  let waitingPlayerTools = playersTools[waitingPlayer];
  let waitingPlayerGraveyardTools = playerToolsGraveyard[waitingPlayer];

  // const currentPlayerSpecialInformation = changeSpecialInformation(currentPlayerTools, playersSpecialInformation[currentPlayer], colRowCurrent, colRowDestination);
  currentPlayerTools = moveSetPieceChangeName(
    colRowCurrent,
    colRowDestination,
    currentPlayerTools
  );

  if (colRowToKill) {
    [waitingPlayerTools, waitingPlayerGraveyardTools] =
      killSetPieceAndAddToGraveyard(
        colRowToKill,
        waitingPlayerTools,
        waitingPlayerGraveyardTools
      );
  }

  // // handle special cases for the tool who played the game
  // currentPlayerTools[colRowDestination] = {
  //   ...currentPlayerTools[colRowDestination],
  //   specialCases: toolSpecialInformation(
  //     colRowCurrent,
  //     colRowDestination,
  //     currentPlayerTools[colRowDestination].type,
  //     currentPlayerTools[colRowDestination].specialCases
  //   ),
  // };

  return {
    playersTools: {
      ...playersTools,
      [currentPlayer]: currentPlayerTools,
      [waitingPlayer]: waitingPlayerTools,
    },
    playerToolsGraveyard: {
      ...playerToolsGraveyard,
      [waitingPlayer]: waitingPlayerGraveyardTools,
    },
  };
};

export const getPossibleOptions = (myParams) => {
  const {
    currentPlayerTools,
    waitingPlayerTools,
    currentPlayerSpecialInformation,
    waitingPlayerSpecialInformation,
  } = myParams;
  const optionsCurrentPlayer = {};
  for (const [key, value] of Object.entries(currentPlayerTools)) {
    let [col, row] = key.split("_");
    let correctCol = colsInBoard.indexOf(col);
    let correctRow = parseInt(row) - 1;
    const params = {
      currentPlayerTools,
      waitingPlayerTools,
      path: currentPlayerSpecialInformation.color,
      currentPlayerSpecialInformation: currentPlayerSpecialInformation,
      waitingPlayerSpecialInformation: waitingPlayerSpecialInformation,
      row: correctRow,
      col: correctCol,
    };
    switch (value.type as any) {
      case ChessTool.Pawn:
        optionsCurrentPlayer[key] = pawnPossiblePath(params);
        break;
      case ChessTool.Knight:
        optionsCurrentPlayer[key] = knightPossibleMove(params);
        break;
      case ChessTool.Rook:
        optionsCurrentPlayer[key] = rookPossibleMove(params);
        break;
      case ChessTool.Bishop:
        optionsCurrentPlayer[key] = bishopPossibleMove(params);
        break;
      case ChessTool.Queen:
        optionsCurrentPlayer[key] = rookPossibleMove(params);
        optionsCurrentPlayer[key] = {
          ...optionsCurrentPlayer[key],
          ...bishopPossibleMove(params),
        };
        break;
      case ChessTool.King:
        optionsCurrentPlayer[key] = kingPossibleMove(params);
      default:
        break;
    }
  }
  return optionsCurrentPlayer;
};

export const filterSelfCheckMove = (
  playersTools,
  currentPlayer,
  waitingPlayer,
  playerToolsGraveyard,
  playersSpecialInformation,
  possibleOptions
) => {
  const validMoves = {};

  for (const [colRowCurrent, colRowDestinations] of Object.entries(
    possibleOptions
  )) {
    for (const colRowDestination of Object.keys(colRowDestinations)) {
      let pawnToKill = shouldKillPawnPassant(
        colRowCurrent,
        colRowDestination,
        playersTools[currentPlayer],
        playersTools[waitingPlayer]
      );
      let tooToKill: any = null;
      if (pawnToKill) {
        tooToKill = pawnToKill;
      } else if (playersTools[waitingPlayer][colRowDestination]) {
        tooToKill = colRowDestination;
      }

      let { playersTools: updatedPlayerTools } = moveSetPiece(
        playersTools,
        currentPlayer,
        waitingPlayer,
        playerToolsGraveyard,
        colRowCurrent,
        colRowDestination,
        tooToKill
      );

      //possible options after the move
      let possibleOpponentOptions = getPossibleOptions({
        currentPlayerTools: updatedPlayerTools[waitingPlayer],
        waitingPlayerTools: updatedPlayerTools[currentPlayer],
        currentPlayerSpecialInformation:
          playersSpecialInformation[currentPlayer],
        waitingPlayerSpecialInformation:
          playersSpecialInformation[waitingPlayer],
      });

      if (
        !isKingInAttack(
          possibleOpponentOptions,
          updatedPlayerTools[currentPlayer]
        )
      ) {
        if (colRowCurrent in validMoves) {
          validMoves[colRowCurrent] = {
            ...validMoves[colRowCurrent],
            [colRowDestination]: true,
          };
        } else {
          validMoves[colRowCurrent] = {
            [colRowDestination]: true,
          };
        }
      }
    }
  }

  return validMoves;
};

export const isKingInAttack = (possibleOptions, currentPlayerTools) => {
  for (let possibleColRows of Object.values(possibleOptions)) {
    for (const possibleColRow of Object.keys(possibleColRows)) {
      if (
        possibleColRow in currentPlayerTools &&
        currentPlayerTools[possibleColRow].type === ChessTool.King
      ) {
        return true;
      }
    }
  }
  return false;
};
