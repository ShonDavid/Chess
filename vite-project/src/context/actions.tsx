import { rowsInBoard } from "../utils/constants";
import {
  ChessTool,
  PawnPath,
  PlayerToolsType,
  SpecialInformation,
} from "../utils/types";
import {
  filterSelfCheckMove,
  getPossibleOptions,
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
      let pawnToKill = shouldKillPawnPassant(
        chosenTool,
        squareId,
        playersTools[currentPlayer],
        playersTools[waitingPlayer]
      );
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

export const setPossibleOptions: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { currentPlayer, waitingPlayer, playersTools, playerToolsGraveyard } =
      getState();
    const optionsCurrentPlayer = getPossibleOptions({
      currentPlayerTools: playersTools[currentPlayer],
      waitingPlayerTools: playersTools[waitingPlayer],
    });
    const optionsCurrentPlayerWithoutCheck = filterSelfCheckMove(
      playersTools,
      currentPlayer,
      waitingPlayer,
      playerToolsGraveyard,
      optionsCurrentPlayer
    );
    return dispatch({
      type: ActionType.SET_POSSIBLE_OPTIONS,
      payload: optionsCurrentPlayerWithoutCheck,
    });
  };
