import { ColsInBoard, sounds } from "../utils/constants";
import { ChessTool } from "../utils/types";
import {
  checkGameState,
  filterSelfCheckMove,
  getPossibleOptions,
  isKingInAttack,
  playSound,
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
      playersSpecialInformation,
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
      if (
        playersTools[currentPlayer][chosenTool].type === ChessTool.Pawn &&
        chosenTool.split("_")[0] !== squareId.split("_")[0] &&
        !(squareId in playersTools[waitingPlayer])
      ) {
        console.log("En passant!");
        dispatch({
          type: ActionType.MOVE_EN_PASSANT_PLAYER_TOOL,
          payload: {
            pawnToKill:
              playersSpecialInformation[waitingPlayer].pawnMovedTwiceNow,
            pawnDestination: squareId,
          },
        });
        // handle castling
      } else if (
        playersTools[currentPlayer][chosenTool].type === ChessTool.King &&
        Math.abs(
          parseInt(ColsInBoard[chosenTool.split("_")[0]]) -
            parseInt(ColsInBoard[squareId.split("_")[0]])
        ) > 1
      ) {
        //  move king
        dispatch({
          type: ActionType.MOVE_PLAYER_TOOL,
          payload: { currentPosition: chosenTool, destination: squareId },
        });

        // move rook
        dispatch({
          type: ActionType.MOVE_PLAYER_TOOL,
          payload: {
            currentPosition:
              (squareId.split("_")[0] === "c" ? "a" : "h") +
              "_" +
              chosenTool.split("_")[1],
            destination:
              (squareId.split("_")[0] === "c" ? "d" : "f") +
              "_" +
              squareId.split("_")[1],
          },
        });
      } else if (playersTools[waitingPlayer][squareId]) {
        dispatch({
          type: ActionType.MOVE_AND_KILL_PLAYER_TOOL,
          payload: {
            currentPosition: chosenTool,
            destination: squareId,
            killSetPiece: squareId,
          },
        });
      } else {
        dispatch({
          type: ActionType.MOVE_PLAYER_TOOL,
          payload: { currentPosition: chosenTool, destination: squareId },
        });
      }

      playSound(sounds.move);
      // switch player turn after move
      return dispatch({
        type: ActionType.SWITCH_PLAYER_TURN,
      });
    }
  };

export const getOptionsAndGameState: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const {
      currentPlayer,
      waitingPlayer,
      playersTools,
      playerToolsGraveyard,
      playersSpecialInformation,
    } = getState();

    const optionsCurrentPlayer = getPossibleOptions(
      playersTools[currentPlayer],
      playersTools[waitingPlayer],
      playersSpecialInformation[currentPlayer],
      playersSpecialInformation[waitingPlayer]
    );

    const optionsWaitingPlayer = getPossibleOptions(
      playersTools[waitingPlayer],
      playersTools[currentPlayer],
      playersSpecialInformation[waitingPlayer],
      playersSpecialInformation[currentPlayer]
    );

    const isCurrentPlayerInCheck = isKingInAttack(
      optionsWaitingPlayer,
      playersTools[currentPlayer]
    );

    const filteredPossibleOptions = filterSelfCheckMove(
      playersTools,
      currentPlayer,
      waitingPlayer,
      playerToolsGraveyard,
      playersSpecialInformation,
      isCurrentPlayerInCheck,
      optionsCurrentPlayer
    );

    const gameState = checkGameState(
      filteredPossibleOptions,
      isCurrentPlayerInCheck
    );

    if (gameState === "checkmate") {
      playSound(sounds.victory);
    }

    return dispatch({
      type: ActionType.SET_OPTIONS_AND_GAME_STATE,
      payload: { possibleOptions: filteredPossibleOptions, gameState },
    });
  };
