import GameEndedModal from "../components/GameEndedModal/GameEndedModal";
import PawnPromotionModal from "../components/PawnPromotionModal/PawnPromotionModal";
import { ColsInBoard, sounds } from "../utils/constants";
import { ChessState, ChessTool } from "../utils/types";
import {
  checkGameState,
  filterSelfCheckMove,
  getPossibleOptions,
  isKingInAttack,
  playSound,
} from "../utils/utils";
import { ActionType } from "./ActionType";
import { State } from "./AppContext";

export const addToPlayHistory: any =
  (type, destination, caseOfPlay) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    return dispatch({
      type: ActionType.ADD_TO_PLAY_HISTORY,
      payload: params,
    });
  };

export const makeToolMove: any =
  (squareId: ChessTool) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { chosenTool, currentPlayer, playersTools } = getState();
    dispatch({
      type: ActionType.MOVE_PLAYER_TOOL,
      payload: { currentPosition: chosenTool, destination: squareId },
    });
    dispatch(
      addToPlayHistory(playersTools[currentPlayer][squareId], destination)
    );
    return dispatch({
      type: ActionType.SWITCH_PLAYER_TURN,
    });
  };

export const makeToolKillAndMove: any =
  (squareId: ChessTool) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { chosenTool } = getState();
    dispatch({
      type: ActionType.MOVE_AND_KILL_PLAYER_TOOL,
      payload: {
        currentPosition: chosenTool,
        destination: squareId,
        killSetPiece: squareId,
      },
    });
    return dispatch({
      type: ActionType.SWITCH_PLAYER_TURN,
    });
  };

export const makeEnPassantMove: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { waitingPlayer, playersSpecialInformation } = getState();

    dispatch({
      type: ActionType.MOVE_EN_PASSANT_PLAYER_TOOL,
      payload: {
        pawnToKill: playersSpecialInformation[waitingPlayer].pawnMovedTwiceNow,
        pawnDestination: squareId,
      },
    });
    return dispatch({
      type: ActionType.SWITCH_PLAYER_TURN,
    });
  };

export const makePromotionMove: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { waitingPlayer, chosenTool, playersTools } = getState();
    if (playersTools[waitingPlayer][squareId]) {
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
    return dispatch(promotionOptionsModal(squareId));
  };

export const makeCastleMove: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { chosenTool } = getState();
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
          chosenTool?.split("_")[1],
        destination:
          (squareId.split("_")[0] === "c" ? "d" : "f") +
          "_" +
          squareId.split("_")[1],
      },
    });
  };

export const onClickSquare: any =
  (squareId: string) =>
  async (dispatch: React.Dispatch<any>, getState: () => State) => {
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
      // handle en passant
      if (
        playersTools[currentPlayer][chosenTool].type === ChessTool.Pawn &&
        chosenTool.split("_")[0] !== squareId.split("_")[0] &&
        !(squareId in playersTools[waitingPlayer])
      ) {
        dispatch(makeEnPassantMove(squareId));

        // handle promotion
      } else if (
        playersTools[currentPlayer][chosenTool].type === ChessTool.Pawn &&
        (squareId.split("_")[1] === "1" || squareId.split("_")[1] === "8")
      ) {
        return dispatch(makePromotionMove(squareId));

        // handle castling
      } else if (
        playersTools[currentPlayer][chosenTool].type === ChessTool.King &&
        Math.abs(
          parseInt(ColsInBoard[chosenTool.split("_")[0]]) -
            parseInt(ColsInBoard[squareId.split("_")[0]])
        ) > 1
      ) {
        return dispatch(makeCastleMove(squareId));
      } else if (playersTools[waitingPlayer][squareId]) {
        return dispatch(makeToolKillAndMove(squareId));
      } else {
        return dispatch(makeToolMove(squareId));
      }
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

    if (gameState === ChessState.Checkmate) {
      setTimeout(() => {
        playSound(sounds.victory);
        dispatch(openEndedGameModal("Checkmate!", `${waitingPlayer} wins!`));
      }, 500);
    }

    if (gameState === ChessState.Tie) {
      setTimeout(() => {
        playSound(sounds.tie);
        dispatch(openEndedGameModal("It's a Tie!"));
      }, 500);
    }

    return dispatch({
      type: ActionType.SET_OPTIONS_AND_GAME_STATE,
      payload: { possibleOptions: filteredPossibleOptions, gameState },
    });
  };

export const resetGame: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    return dispatch({
      type: ActionType.RESET_GAME,
    });
  };

export const closeModal: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    return dispatch({
      type: ActionType.CLOSE_MODAL,
    });
  };

export const clearModal: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    return dispatch({
      type: ActionType.CLEAR_MODAL,
    });
  };

export const openEndedGameModal: any = (text, secondaryText = "") => ({
  type: ActionType.OPEN_MODAL,
  payload: {
    content: GameEndedModal,
    props: {
      text,
      secondaryText,
    },
    showModalButton: true,
  },
});

export const promotionOptionsModal: any =
  (pawnPosition) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { currentPlayer } = getState();

    return dispatch({
      type: ActionType.OPEN_MODAL,
      payload: {
        content: PawnPromotionModal,
        props: {
          currentPlayer,
          onClickPromotion: (pawnPromotion) =>
            dispatch(onChoosePromotion(pawnPromotion, pawnPosition)),
        },
        showModalButton: false,
      },
    });
  };

export const onChoosePromotion: any =
  (toolPromotion, pawnPosition) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    dispatch(closeModal());
    dispatch({
      type: ActionType.PAWN_PROMOTION,
      payload: { pawnPosition, toolPromotion },
    });
    playSound(sounds.move);
    return dispatch({
      type: ActionType.SWITCH_PLAYER_TURN,
    });
  };
