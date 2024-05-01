// AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import {
  blackPlayerSpecialInformation,
  firstPlayerPossibleOptions,
  firstPlayerTools,
  secondPlayerTools,
  whitePlayerSpecialInformation,
} from "../utils/constants";
import { PlayerToolsType, PlayerTurn, PlayersToolsType } from "../utils/types";
import { ActionType } from "./ActionType";
import { moveSetPiece } from "../utils/utils";

export type State = {
  counter: number;
  user: any;
  currentPlayer: PlayerTurn;
  waitingPlayer: PlayerTurn;
  isOnTool: boolean;
  playersTools: PlayersToolsType;
  playersSpecialInformation: any;
  possibleOptions: any;
  playerToolsGraveyard: any;
  toolToMove: string | null;
  chosenTool: string | null;
};

type Action = { type: ActionType; payload: any };

const initialState: State = {
  counter: 0,
  user: null,
  playersSpecialInformation: {
    [PlayerTurn.White]: whitePlayerSpecialInformation,
    [PlayerTurn.Black]: blackPlayerSpecialInformation,
  },
  playersTools: {
    [PlayerTurn.White]: firstPlayerTools,
    [PlayerTurn.Black]: secondPlayerTools,
  },
  playerToolsGraveyard: {
    [PlayerTurn.White]: [],
    [PlayerTurn.Black]: [],
  },
  possibleOptions: firstPlayerPossibleOptions,
  currentPlayer: PlayerTurn.White,
  waitingPlayer: PlayerTurn.Black,
  isOnTool: false,
  toolToMove: null,
  chosenTool: null,
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
    case ActionType.SET_POSSIBLE_OPTIONS:
      return {
        ...state,
        possibleOptions: payload,
      };
    case ActionType.MOVE_AND_KILL_PLAYER_TOOL:
      stateChanges = moveSetPiece(
        state.playersTools,
        state.currentPlayer,
        state.waitingPlayer,
        state.playerToolsGraveyard,
        state.chosenTool,
        payload,
        payload
      );
      return {
        ...state,
        ...stateChanges,
      };
    case ActionType.MOVE_EN_PASSANT_PLAYER_TOOL:
      stateChanges = moveSetPiece(
        state.playersTools,
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
      stateChanges = moveSetPiece(
        state.playersTools,
        state.currentPlayer,
        state.waitingPlayer,
        state.playerToolsGraveyard,
        state.chosenTool,
        payload,
        null
      );
      return {
        ...state,
        ...stateChanges,
      };
    case ActionType.SWITCH_PLAYER_TURN:
      return {
        ...state,
        currentPlayer: state.waitingPlayer,
        waitingPlayer: state.currentPlayer,
        chosenTool: null,
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

  const dispatchWithMiddleware: React.Dispatch<Action> = (action: any) => {
    if (typeof action === "function") {
      action(dispatchWithMiddleware, () => state); // Pass getState function
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
