// AppContext.tsx
import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  ReactElement,
} from "react";
import {
  blackPlayerSpecialInformation,
  firstPlayerPossibleOptions,
  firstPlayerTools,
  secondPlayerTools,
  whitePlayerSpecialInformation,
} from "../utils/constants";
import { ChessColor, ChessState, PlayersToolsType } from "../utils/types";
import { ActionType } from "./ActionType";
import { moveSetPieceAndChangeSpecialInformation } from "../utils/utils";

export type State = {
  user: any;
  currentPlayer: ChessColor;
  waitingPlayer: ChessColor;
  isOnTool: boolean;
  playersTools: PlayersToolsType;
  playersSpecialInformation: any;
  possibleOptions: any;
  playerToolsGraveyard: any;
  toolToMove: string | null;
  chosenTool: string | null;
  gameState: ChessState;
  isModalOpen: boolean;
  showModalButton: boolean;
  modalProps: { [key: string]: any };
  modalContent: any;
  playHistory: string[];
};

type Action = { type: ActionType; payload: any };

const initialState: State = {
  user: null,
  playersSpecialInformation: {
    [ChessColor.White]: whitePlayerSpecialInformation,
    [ChessColor.Black]: blackPlayerSpecialInformation,
  },
  playersTools: {
    [ChessColor.White]: firstPlayerTools,
    [ChessColor.Black]: secondPlayerTools,
  },
  playerToolsGraveyard: {
    [ChessColor.White]: [],
    [ChessColor.Black]: [],
  },
  possibleOptions: firstPlayerPossibleOptions,
  currentPlayer: ChessColor.White,
  waitingPlayer: ChessColor.Black,
  isOnTool: false,
  toolToMove: null,
  chosenTool: null,
  gameState: ChessState.Playing,
  isModalOpen: false,
  modalContent: null,
  showModalButton: false,
  modalProps: {},
  playHistory: [],
};

// to debug: console.log(action)
const reducer = (state: State, action: Action): State => {
  const { payload } = action;
  console.log(action);
  let stateChanges;
  switch (action.type) {
    case ActionType.SET_CHOSEN_TOOL:
      return {
        ...state,
        chosenTool: payload,
      };
    case ActionType.SET_OPTIONS_AND_GAME_STATE:
      return {
        ...state,
        possibleOptions: payload.possibleOptions,
        gameState: payload.gameState,
      };
    case ActionType.MOVE_AND_KILL_PLAYER_TOOL:
      stateChanges = moveSetPieceAndChangeSpecialInformation(
        state.playersTools,
        state.playersSpecialInformation,
        state.currentPlayer,
        state.waitingPlayer,
        state.playerToolsGraveyard,
        payload.currentPosition,
        payload.destination,
        payload.killSetPiece
      );
      return {
        ...state,
        ...stateChanges,
      };
    case ActionType.MOVE_EN_PASSANT_PLAYER_TOOL:
      stateChanges = moveSetPieceAndChangeSpecialInformation(
        state.playersTools,
        state.playersSpecialInformation,
        state.currentPlayer,
        state.waitingPlayer,
        state.playerToolsGraveyard,
        state.chosenTool,
        payload.pawnDestination,
        payload.pawnToKill
      );
      return {
        ...state,
        ...stateChanges,
      };
    case ActionType.MOVE_PLAYER_TOOL:
      stateChanges = moveSetPieceAndChangeSpecialInformation(
        state.playersTools,
        state.playersSpecialInformation,
        state.currentPlayer,
        state.waitingPlayer,
        state.playerToolsGraveyard,
        payload.currentPosition,
        payload.destination,
        null
      );
      return {
        ...state,
        ...stateChanges,
      };
    case ActionType.PAWN_PROMOTION:
      return {
        ...state,
        playersTools: {
          ...state.playersTools,
          [state.currentPlayer]: {
            ...state.playersTools[state.currentPlayer],
            [payload.pawnPosition]: {
              ...state.playersTools[state.currentPlayer][payload.pawnPosition],
              type: payload.toolPromotion,
            },
          },
        },
        chosenTool: payload,
      };
    case ActionType.SWITCH_PLAYER_TURN:
      return {
        ...state,
        currentPlayer: state.waitingPlayer,
        waitingPlayer: state.currentPlayer,
        chosenTool: null,
      };
    case ActionType.RESET_GAME:
      return {
        ...state,
        ...initialState,
      };
    case ActionType.ADD_TO_PLAY_HISTORY:
      return {
        ...state,
        playHistory: [...state.playHistory, payload],
      };
    case ActionType.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalContent: payload.content,
        modalProps: payload.props,
        showModalButton: payload.showModalButton,
      };
    case ActionType.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case ActionType.CLEAR_MODAL:
      return {
        ...state,
        modalContent: null,
        modalProps: {},
        showModalButton: false,
      };
    default:
      return state;
  }
};

const AppContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Custom middleware to provide getState function
const middleware = (
  reducer: React.Reducer<State, Action>,
  initialState: State
) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchWithMiddleware: React.Dispatch<Action> = async (
    action: any
  ) => {
    if (typeof action === "function") {
      await action(dispatchWithMiddleware, () => state); // Pass getState function
    } else {
      dispatch(action);
    }
  };

  return [state, dispatchWithMiddleware];
};

// Create context provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = middleware(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state: state as State,
        dispatch: dispatch as React.Dispatch<Action>,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
