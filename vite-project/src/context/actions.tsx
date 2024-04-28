import { ColsInBoard, colsInBoard } from "../utils/constants";
import {
  ChessTool,
  ChessColor,
  PlayerToolsType,
  SpecialInformation,
} from "../utils/types";
import {
  filterSelfCheckMove,
  getPossibleOptions,
  isKingInAttack,
  shouldKillPawnPassant,
} from "../utils/utils";
import { ActionType } from "./ActionType";
import { State } from "./AppContext";

export const onClickSquare: any =
  (squareId: string) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
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
      // let pawnToKill = shouldKillPawnPassant(
      //   chosenTool,
      //   squareId,
      //   playersTools[currentPlayer],
      //   playersTools[waitingPlayer]
      // );
      // if (pawnToKill) {
      //   console.log("En passant!");
      //   dispatch({
      //     type: ActionType.MOVE_EN_PASSANT_PLAYER_TOOL,
      //     payload: { pawnToKill, pawnDestination: squareId },
      //   });
      //handle castling
      // } else if (
      //   playersTools[currentPlayer][chosenTool].type === ChessTool.King &&
      //   Math.abs(
      //     ColsInBoard[chosenTool.split("_")[0]] -
      //       ColsInBoard[squareId.split("_")[0]]
      //   ) > 1
      // ) {
      //   dispatch({
      //     type: ActionType.MOVE_CASTLING_PLAYER_TOOL,
      //     payload: { kingDestination: squareId, rookDestination: (squareId.split("_")[0] === 'c'? "d": "f")+ "_" + chosenTool.split("_")[1] },
      //   });
      // } else 
      if (playersTools[waitingPlayer][squareId]) {
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
    const { currentPlayer, waitingPlayer, playersTools, playerToolsGraveyard, playersSpecialInformation } =
      getState();
    
    const optionsCurrentPlayer = getPossibleOptions({
      currentPlayerTools: playersTools[currentPlayer],
      waitingPlayerTools: playersTools[waitingPlayer],
      currentPlayerSpecialInformation: playersSpecialInformation[currentPlayer],
      waitingPlayerSpecialInformation: playersSpecialInformation[waitingPlayer],
    });

    // const optionsCurrentPlayerWithoutCheck = filterSelfCheckMove(
    //   playersTools,
    //   currentPlayer,
    //   waitingPlayer,
    //   playerToolsGraveyard,
    //   optionsCurrentPlayer
    // );

    return dispatch({
      type: ActionType.SET_POSSIBLE_OPTIONS,
      payload: optionsCurrentPlayer,
    });
  };

export const setIsKingUnderAttack: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { currentPlayer, waitingPlayer, playersTools, possibleOptions, playersSpecialInformation} =
      getState();
    const optionsOpponentPlayer = getPossibleOptions({
      currentPlayerTools: playersTools[waitingPlayer],
      waitingPlayerTools: playersTools[currentPlayer],
      currentPlayerSpecialInformation: playersSpecialInformation[currentPlayer],
      waitingPlayerSpecialInformation: playersSpecialInformation[waitingPlayer],
    });
    const isCheck = isKingInAttack(
      optionsOpponentPlayer,
      playersTools[currentPlayer]
    );
    if (isCheck && Object.keys(possibleOptions).length === 0) {
      console.log("Check Mate!");
    } else if (Object.keys(possibleOptions).length === 0) {
      console.log("Tie!");
    } else if (isCheck) {
      console.log("Check!");
    }
  };
