import { ChessTool, ChessColor } from "./types";
import moveSound from "../assets/sounds/move.wav";
import victorySound from "../assets/sounds/victory.mp3";
import tieSound from "../assets/sounds/tie.mp3";

export const firstPlayerTools = {
  a_2: {
    type: ChessTool.Pawn,
    id: 1,
  },
  b_2: {
    type: ChessTool.Pawn,
    id: 2,
  },
  c_2: {
    type: ChessTool.Pawn,
    id: 3,
  },
  d_2: {
    type: ChessTool.Pawn,
    id: 4,
  },
  e_2: {
    type: ChessTool.Pawn,
    id: 5,
  },
  f_2: {
    type: ChessTool.Pawn,
    id: 6,
  },
  g_2: {
    type: ChessTool.Pawn,
    id: 7,
  },
  h_2: {
    type: ChessTool.Pawn,
    id: 8,
  },
  a_1: {
    type: ChessTool.Rook,
    id: 9,
  },
  b_1: {
    type: ChessTool.Knight,
    id: 10,
  },
  c_1: {
    type: ChessTool.Bishop,
    id: 11,
  },
  d_1: {
    type: ChessTool.Queen,
    id: 12,
  },
  e_1: {
    type: ChessTool.King,
    id: 13,
  },
  f_1: {
    type: ChessTool.Bishop,
    id: 14,
  },
  g_1: {
    type: ChessTool.Knight,
    id: 15,
  },
  h_1: {
    type: ChessTool.Rook,
    id: 16,
  },
};

export const secondPlayerTools = {
  a_7: {
    type: ChessTool.Pawn,
    id: 17,
  },
  b_7: {
    type: ChessTool.Pawn,
    id: 18,
  },
  c_7: {
    type: ChessTool.Pawn,
    id: 19,
  },
  d_7: {
    type: ChessTool.Pawn,
    id: 20,
  },
  e_7: {
    type: ChessTool.Pawn,
    id: 21,
  },
  f_7: {
    type: ChessTool.Pawn,
    id: 22,
  },
  g_7: {
    type: ChessTool.Pawn,
    id: 23,
  },
  h_7: {
    type: ChessTool.Pawn,
    id: 24,
  },
  a_8: {
    type: ChessTool.Rook,
    id: 25,
  },
  b_8: {
    type: ChessTool.Knight,
    id: 26,
  },
  c_8: {
    type: ChessTool.Bishop,
    id: 27,
  },
  d_8: {
    type: ChessTool.Queen,
    id: 28,
  },
  e_8: {
    type: ChessTool.King,
    id: 29,
  },
  f_8: {
    type: ChessTool.Bishop,
    id: 30,
  },
  g_8: {
    type: ChessTool.Knight,
    id: 31,
  },
  h_8: {
    type: ChessTool.Rook,
    id: 32,
  },
};

export const firstPlayerPossibleOptions = {
  a_2: {
    a_3: true,
    a_4: true,
  },
  b_2: {
    b_3: true,
    b_4: true,
  },
  c_2: {
    c_3: true,
    c_4: true,
  },
  d_2: {
    d_3: true,
    d_4: true,
  },
  e_2: {
    e_3: true,
    e_4: true,
  },
  f_2: {
    f_3: true,
    f_4: true,
  },
  g_2: {
    g_3: true,
    g_4: true,
  },
  h_2: {
    h_3: true,
    h_4: true,
  },
  b_1: {
    c_3: true,
    a_3: true,
  },
  g_1: {
    h_3: true,
    f_3: true,
  },
};

export const whitePlayerSpecialInformation = {
  kingMoved: false,
  rookMoved: { a: false, h: false },
  pawnMoved: {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
  },
  pawnMovedTwiceNow: "",
  color: ChessColor.White,
};

export const blackPlayerSpecialInformation = {
  kingMoved: false,
  rookMoved: { a: false, h: false },
  pawnMoved: {
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
  },
  pawnMovedTwiceNow: "",
  color: ChessColor.Black,
};

export const chessBoard = Array.from({ length: 8 }, () => Array(8).fill(null));
export const colsInBoard = ["a", "b", "c", "d", "e", "f", "g", "h"];

export enum ColsInBoard {
  a = 0,
  b = 1,
  c = 2,
  d = 3,
  e = 4,
  f = 5,
  g = 6,
  h = 7,
}

export const chessToolGraveyardOrder = [
  ChessTool.Pawn,
  ChessTool.Knight,
  ChessTool.Bishop,
  ChessTool.Rook,
  ChessTool.Queen,
];

export const chessToolPromotionPawn = [
  ChessTool.Queen,
  ChessTool.Rook,
  ChessTool.Bishop,
  ChessTool.Knight,
];

export const charOfChessTool = {
  [ChessTool.Pawn]: "P",
  [ChessTool.Knight]: "N",
  [ChessTool.Bishop]: "B",
  [ChessTool.Rook]: "R",
  [ChessTool.Queen]: "Q",
};

export const sounds = {
  move: moveSound,
  victory: victorySound,
  tie: tieSound,
};
