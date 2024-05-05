import { ColsInBoard, colsInBoard } from "./constants";
import { ChessTool, ChessColor } from "./types";
import cloneDeep from "lodash.clonedeep";

export const playSound = (sound) => {
  const audio = new Audio(sound);
  audio.play();
  return audio;
};

const convertRowAndColToKey = (col: number, row: number) => {
  const colString = colsInBoard[col];
  const rowString = row + 1;
  return `${colString}_${rowString}`;
};

export const pawnPossibleMove = (params) => {
  const paths: any = {};
  const {
    path,
    col,
    row,
    currentPlayerTools,
    waitingPlayerTools,
    currentPlayerSpecialInformation,
    waitingPlayerSpecialInformation,
    id,
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
      !currentPlayerSpecialInformation.pawnMoved[id] &&
      !(forwardMove2 in waitingPlayerTools) &&
      !(forwardMove2 in currentPlayerTools)
    ) {
      paths[forwardMove2] = true;
    }
  }

  // Diagonal captures
  const diagonalDirectionLeft = convertRowAndColToKey(col - 1, row + direction);
  if (waitingPlayerTools[diagonalDirectionLeft]) {
    paths[diagonalDirectionLeft] = true;
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
    !(diagonalDirectionLeft in currentPlayerTools) &&
    waitingPlayerSpecialInformation.pawnMovedTwiceNow === passantLeft
  ) {
    paths[diagonalDirectionLeft] = true;
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
    let rightCastling = !currentPlayerSpecialInformation.rookMoved.h;
    let leftCastling = !currentPlayerSpecialInformation.rookMoved.a;
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

export const moveSetPieceToDestination = (
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
  playersSpecialInformation,
  currentPlayer,
  waitingPlayer,
  colRowCurrent,
  colRowDestination
) => {
  const specialInformation = cloneDeep(playersSpecialInformation);

  let [curCol, curRow] = colRowCurrent.split("_");
  let [destinationCol, destinationRow] = colRowDestination.split("_");
  specialInformation[waitingPlayer].pawnMovedTwiceNow = "";

  switch (playerPieces[currentPlayer][colRowCurrent].type) {
    case ChessTool.Pawn:
      specialInformation[currentPlayer].pawnMoved[
        playerPieces[currentPlayer][colRowCurrent].id
      ] = true;
      specialInformation[currentPlayer].pawnMovedTwiceNow = "";
      if (
        Math.abs(parseInt(curRow) - parseInt(destinationRow)) === 2 &&
        curCol === destinationCol
      ) {
        specialInformation[currentPlayer].pawnMovedTwiceNow = colRowDestination;
      }
      break;
    case ChessTool.Rook:
      if (curCol === "a") {
        specialInformation[currentPlayer].rookMoved.a = true;
      } else if (curCol === "h") {
        specialInformation[currentPlayer].rookMoved.h = true;
      }
      break;
    case ChessTool.King:
      specialInformation[currentPlayer].kingMoved = true;
      break;
    default:
      break;
  }
  return {
    ...playersSpecialInformation,
    [currentPlayer]: specialInformation[currentPlayer],
    [waitingPlayer]: specialInformation[waitingPlayer],
  };
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
  let currentPlayerTools = moveSetPieceToDestination(
    colRowCurrent,
    colRowDestination,
    playersTools[currentPlayer]
  );
  let waitingPlayerTools = playersTools[waitingPlayer];
  let waitingPlayerGraveyardTools = playerToolsGraveyard[waitingPlayer];

  // in case of killing a piece, we need to remove it from the waiting player tools and add it to the graveyard of the waiting player.
  if (colRowToKill) {
    [waitingPlayerTools, waitingPlayerGraveyardTools] =
      killSetPieceAndAddToGraveyard(
        colRowToKill,
        waitingPlayerTools,
        waitingPlayerGraveyardTools
      );
  }
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

export const moveSetPieceAndChangeSpecialInformation = (
  playersTools,
  playersSpecialInformation,
  currentPlayer,
  waitingPlayer,
  playerToolsGraveyard,
  colRowCurrent,
  colRowDestination,
  colRowToKill
) => {
  const {
    playersTools: playerToolsToReturn,
    playerToolsGraveyard: playerToolsGraveyardToReturn,
  } = moveSetPiece(
    playersTools,
    currentPlayer,
    waitingPlayer,
    playerToolsGraveyard,
    colRowCurrent,
    colRowDestination,
    colRowToKill
  );

  const playersSpecialInformationToReturn = changeSpecialInformation(
    playersTools,
    playersSpecialInformation,
    currentPlayer,
    waitingPlayer,
    colRowCurrent,
    colRowDestination
  );

  return {
    playersTools: playerToolsToReturn,
    playerToolsGraveyard: playerToolsGraveyardToReturn,
    playersSpecialInformation: playersSpecialInformationToReturn,
  };
};

export const getPossibleOptions = (
  currentPlayerTools,
  waitingPlayerTools,
  currentPlayerSpecialInformation,
  waitingPlayerSpecialInformation
) => {
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
      id: value.id,
      row: correctRow,
      col: correctCol,
    };
    switch (value.type as any) {
      case ChessTool.Pawn:
        optionsCurrentPlayer[key] = pawnPossibleMove(params);
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
        optionsCurrentPlayer[key] = {
          ...rookPossibleMove(params),
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
  isCurrentPlayerInCheck,
  possibleOptions
) => {
  const validMoves = {};

  for (const [colRowCurrent, colRowDestinations] of Object.entries(
    possibleOptions
  )) {
    for (const colRowDestination of Object.keys(colRowDestinations)) {
      let tooToKill: any = null;
      if (
        playersTools[currentPlayer][colRowCurrent].type === ChessTool.Pawn &&
        colRowCurrent.split("_")[0] !== colRowDestination.split("_")[0] &&
        !(colRowDestination in playersTools[waitingPlayer])
      ) {
        tooToKill = playersSpecialInformation[waitingPlayer].pawnMovedTwiceNow;
      } else if (playersTools[waitingPlayer][colRowDestination]) {
        tooToKill = colRowDestination;
      }

      let {
        playersTools: updatedPlayerTools,
        playersSpecialInformation: updatedPlayersSpecialInformation,
      } = moveSetPieceAndChangeSpecialInformation(
        playersTools,
        { ...playersSpecialInformation },
        currentPlayer,
        waitingPlayer,
        playerToolsGraveyard,
        colRowCurrent,
        colRowDestination,
        tooToKill
      );

      //possible options after the move
      let possibleOpponentOptions = getPossibleOptions(
        updatedPlayerTools[waitingPlayer],
        updatedPlayerTools[currentPlayer],
        updatedPlayersSpecialInformation[waitingPlayer],
        updatedPlayersSpecialInformation[currentPlayer]
      );

      if (
        !isKingInAttack(
          possibleOpponentOptions,
          updatedPlayerTools[currentPlayer]
        )
      ) {
        if (
          playersTools[currentPlayer][colRowCurrent].type === ChessTool.King &&
          isCurrentPlayerInCheck &&
          ["c", "g"].includes(colRowDestination.split("_")[0])
        ) {
          continue;
        } else if (colRowCurrent in validMoves) {
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

export const checkGameState = (possibleOptions, isCheck) => {
  if (isCheck && Object.keys(possibleOptions).length === 0) {
    return "checkmate";
  } else if (Object.keys(possibleOptions).length === 0) {
    return "tie";
  } else if (isCheck) {
    return "check";
  } else {
    return null;
  }
};
