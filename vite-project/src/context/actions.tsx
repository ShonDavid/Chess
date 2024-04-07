import { rowsInBoard } from "../utils/constants";
import {
  ChessTool,
  PawnPath,
  PlayerToolsType,
  SpecialInformation,
} from "../utils/types";
import {
  bishopPossibleMove,
  kingPossibleMove,
  knightPossibleMove,
  pawnPossiblePath,
  rookPossibleMove,
  shouldKillPawnPassant,
} from "../utils/utils";
import { ActionType } from "./ActionType";
import { State } from "./AppContext";

export const onClickSquare: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const {
      currentPlayer,
      waitingPlayer,
      chosenTool,
      playersTools,
      possibleOptions,
    } = getState();

    let isPossibleMove = !!(
      chosenTool &&
      chosenTool in possibleOptions &&
      squareId in possibleOptions[chosenTool]
    );
    if (playersTools[currentPlayer][squareId]) {
      return dispatch({
        type: ActionType.SET_CHOSEN_TOOL,
        payload: squareId,
      });
    } else if (chosenTool && isPossibleMove) {
      let pawnToKill = shouldKillPawnPassant({
        colRowCurrent: chosenTool,
        ColRowDestination: squareId,
        currentPlayerTools: playersTools[currentPlayer],
        waitingPlayerTools: playersTools[waitingPlayer],
      });
      if (pawnToKill) {
        dispatch({
          type: ActionType.MOVE_EN_PASSANT_PLAYER_TOOL,
          payload: { pawnToKill, pawnDestination: squareId },
        });
      } else if (playersTools[waitingPlayer][squareId]) {
        dispatch({
          type: ActionType.MOVE_AND_KILL_PLAYER_TOOL,
          payload: squareId,
        });
      } else {
        dispatch({
          type: ActionType.MOVE_PLAYER_TOOL,
          payload: squareId,
        });
      }
      return dispatch({
        type: ActionType.SWITCH_PLAYER_TURN,
      });
    }
  };

export const getPossibleOptions: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { currentPlayer, waitingPlayer, playersTools } = getState();
    const optionsCurrentPlayer = {};
    for (const [key, value] of Object.entries(playersTools[currentPlayer])) {
      let [col, row] = key.split("_");
      let correctCol = rowsInBoard.indexOf(col);
      let correctRow = parseInt(row) - 1;
      const params = {
        currentPlayerTools: playersTools[currentPlayer],
        waitingPlayerTools: playersTools[waitingPlayer],
        path: value.path,
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
    return dispatch({
      type: ActionType.SET_POSSIBLE_OPTIONS,
      payload: optionsCurrentPlayer,
    });
  };
