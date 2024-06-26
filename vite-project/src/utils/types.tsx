export enum ChessColor {
  White = "WHITE",
  Black = "BLACK",
}

export enum ChessState {
  Playing = "playing",
  Check = "check",
  Tie = "tie",
  Checkmate = "checkmate",
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
  [key in ChessColor]: PlayerToolsType;
};
