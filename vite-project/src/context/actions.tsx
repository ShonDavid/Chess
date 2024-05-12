import GameEndedModal from "../components/GameEndedModal/GameEndedModal";
import PawnPromotionModal from "../components/PawnPromotionModal/PawnPromotionModal";
import { ColsInBoard, charOfChessTool, sounds } from "../utils/constants";
import { ChessState, ChessTool, PlayCases } from "../utils/types";
import {
  checkGameState,
  filterSelfCheckMove,
  getPossibleOptions,
  isKingInAttack,
  playSound,
} from "../utils/utils";
import { ActionType } from "./ActionType";
import { State } from "./AppContext";

export const switchPlayerTurn: any =
  () => (dispatch: React.Dispatch<any>, getState: () => State) => {
    dispatch({
      type: ActionType.SWITCH_PLAYER_TURN,
    });
  };

export const addToPlayHistory: any =
  (stringOfPlay: string) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    dispatch({
      type: ActionType.ADD_TO_PLAY_HISTORY,
      payload: stringOfPlay,
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
    const firstLetter =
      playersTools[currentPlayer][chosenTool as any].type === ChessTool.Pawn
        ? ""
        : charOfChessTool[playersTools[currentPlayer][chosenTool as any].type];
    const stringOfPlay = `${firstLetter}${squareId.split("_")[0]}${
      squareId.split("_")[1]
    }`;
    return dispatch(handleEndOfMove(stringOfPlay));
  };

export const makeToolKillAndMove: any =
  (squareId: ChessTool) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { chosenTool, currentPlayer, playersTools } = getState();
    dispatch({
      type: ActionType.MOVE_AND_KILL_PLAYER_TOOL,
      payload: {
        currentPosition: chosenTool,
        destination: squareId,
        killSetPiece: squareId,
      },
    });
    const firstLetter =
      playersTools[currentPlayer][chosenTool as any].type === ChessTool.Pawn
        ? chosenTool?.split("_")[0]
        : charOfChessTool[playersTools[currentPlayer][chosenTool as any].type];
    const stringOfPlay = `${firstLetter}x${squareId.split("_")[0]}${
      squareId.split("_")[1]
    }`;
    return dispatch(handleEndOfMove(stringOfPlay));
  };

export const makeEnPassantMove: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { waitingPlayer, playersSpecialInformation, chosenTool } = getState();

    dispatch({
      type: ActionType.MOVE_EN_PASSANT_PLAYER_TOOL,
      payload: {
        pawnToKill: playersSpecialInformation[waitingPlayer].pawnMovedTwiceNow,
        pawnDestination: squareId,
      },
    });
    const firstLetter = chosenTool?.split("_")[0];
    const stringOfPlay = `${firstLetter}x${squareId.split("_")[0]}${
      squareId.split("_")[1]
    }`;
    return dispatch(handleEndOfMove(stringOfPlay));
  };

export const makePromotionMove: any =
  (squareId) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { waitingPlayer, currentPlayer, chosenTool, playersTools } =
      getState();
    const firstLetter = chosenTool?.split("_")[0];
    let stringOfPlay = `${squareId.split("_")[0]}${squareId.split("_")[1]}`;
    if (playersTools[waitingPlayer][squareId]) {
      dispatch({
        type: ActionType.MOVE_AND_KILL_PLAYER_TOOL,
        payload: {
          currentPosition: chosenTool,
          destination: squareId,
          killSetPiece: squareId,
        },
      });
      stringOfPlay = `${firstLetter}x${stringOfPlay}`;
    } else {
      dispatch({
        type: ActionType.MOVE_PLAYER_TOOL,
        payload: { currentPosition: chosenTool, destination: squareId },
      });
    }
    return dispatch(promotionOptionsModal(squareId, stringOfPlay));
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
    const stringOfPlay = squareId.split("_")[0] === "c" ? "0-0-0" : "0-0";
    return dispatch(handleEndOfMove(stringOfPlay));
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

export const handleEndOfMove: any =
  (stringOfPlay) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    dispatch(switchPlayerTurn());
    return dispatch(setNewOptionsAndGameState(stringOfPlay));
  };

export const setNewOptionsAndGameState: any =
  (stringOfPlay) => (dispatch: React.Dispatch<any>, getState: () => State) => {
    const {
      currentPlayer,
      waitingPlayer,
      playersTools,
      playerToolsGraveyard,
      playersSpecialInformation,
    } = getState();

    console.log("currentPlayer", currentPlayer);
    console.log("waitingPlayer", waitingPlayer);

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
      playersTools[waitingPlayer]
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

    const gameStateString =
      gameState === ChessState.Checkmate
        ? "#"
        : gameState === ChessState.Tie
        ? "$"
        : gameState === ChessState.Check
        ? "+"
        : "";

    dispatch(addToPlayHistory(stringOfPlay + gameStateString));

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
  (pawnPosition, stringOfPlay) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    const { currentPlayer } = getState();

    return dispatch({
      type: ActionType.OPEN_MODAL,
      payload: {
        content: PawnPromotionModal,
        props: {
          currentPlayer,
          onClickPromotion: (pawnPromotion) =>
            dispatch(
              onChoosePromotion(pawnPromotion, pawnPosition, stringOfPlay)
            ),
        },
        showModalButton: false,
      },
    });
  };

export const onChoosePromotion: any =
  (toolPromotion, pawnPosition, stringOfPlay) =>
  (dispatch: React.Dispatch<any>, getState: () => State) => {
    dispatch(closeModal());
    dispatch({
      type: ActionType.PAWN_PROMOTION,
      payload: { pawnPosition, toolPromotion },
    });
    playSound(sounds.move);
    return dispatch(
      setNewOptionsAndGameState(
        stringOfPlay + "=" + charOfChessTool[toolPromotion]
      )
    );
  };
