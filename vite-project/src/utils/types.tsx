export enum PlayerTurn {
  White = "WHITE",
  Black = "BLACK",
}

export enum ChessColor {
  White = "WHITE",
  Black = "BLACK",
}

export enum SpecialInformation {
  FirstTurn = "FIRST_TURN",
  PawnTwiceMove = "PAWN_TWICE_MOVE",
}

export enum ChessTool {
  Pawn = "PAWN",
  Rook = "ROOK",
  Knight = "KNIGHT",
  Bishop = "BISHOP",
  Queen = "QUEEN",
  King = "KING",
}

export type PlayerToolsType = {
  [key: string]: {
    type: ChessTool;
    id: number;
  };
};

export type PlayersToolsType = {
  [key in PlayerTurn]: PlayerToolsType;
};
