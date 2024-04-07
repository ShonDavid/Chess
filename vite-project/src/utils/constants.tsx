import { ChessTool, PawnPath } from "./types";

export const firstPlayerTools = {
  a_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 1,
  },
  b_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 2,
  },
  c_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 3,
  },
  d_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 4,
  },
  e_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 5,
  },
  f_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 6,
  },
  g_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 7,
  },
  h_2: {
    type: ChessTool.Pawn,
    path: PawnPath.Up,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 8,
  },
  a_1: {
    type: ChessTool.Rook,
    specialCases: { neverMoved: true },
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
    specialCases: { neverMoved: true },
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
    specialCases: { neverMoved: true },
    id: 16,
  },
};

export const secondPlayerTools = {
  a_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 17,
  },
  b_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 18,
  },
  c_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 19,
  },
  d_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 20,
  },
  e_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 21,
  },
  f_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 22,
  },
  g_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 23,
  },
  h_7: {
    type: ChessTool.Pawn,
    path: PawnPath.Down,
    specialCases: { neverMoved: true, movedByTwo: false },
    id: 24,
  },
  a_8: {
    type: ChessTool.Rook,
    specialCases: { neverMoved: true },
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
    specialCases: { neverMoved: true },
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
    specialCases: { neverMoved: true },
    id: 32,
  },
};

export const chessBoard = Array.from({ length: 8 }, () => Array(8).fill(null));
export const rowsInBoard = ["a", "b", "c", "d", "e", "f", "g", "h"];
