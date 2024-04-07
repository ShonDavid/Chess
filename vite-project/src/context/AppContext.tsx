// AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { firstPlayerTools, secondPlayerTools } from "../utils/constants";
import { PlayerToolsType, PlayerTurn, PlayersToolsType } from "../utils/types";
import { ActionType } from "./ActionType";
import { removeAllMovedbyTwo, toolSpecialInformation } from "../utils/utils";

export type State = {
  counter: number;
  user: any;
  currentPlayer: PlayerTurn;
  waitingPlayer: PlayerTurn;
  isOnTool: boolean;
  playersTools: PlayersToolsType;
  possibleOptions: any;
  playerToolsGraveyard: any;
  toolToMove: string | null;
  chosenTool: string | null;
  currentPlayerTools: PlayerToolsType;
  waitingPlayerTools: PlayerToolsType;
  currentPlayerGraveyardTools: any;
  waitingPlayerGraveyardTools: any;
};

type Action = { type: ActionType; payload: any };

const initialState: State = {
  counter: 0,
  user: null,
  playersTools: {
    [PlayerTurn.Player1]: firstPlayerTools,
    [PlayerTurn.Player2]: secondPlayerTools,
  },
  playerToolsGraveyard: {
    [PlayerTurn.Player1]: [],
    [PlayerTurn.Player2]: [],
  },
  possibleOptions: {},
  currentPlayer: PlayerTurn.Player1,
  waitingPlayer: PlayerTurn.Player2,
  currentPlayerTools: firstPlayerTools,
  waitingPlayerTools: secondPlayerTools,
  currentPlayerGraveyardTools: [],
  waitingPlayerGraveyardTools: [],
  isOnTool: false,
  toolToMove: null,
  chosenTool: null,
};

// to debug: console.log(action)
const reducer = (state: State, action: Action): State => {
  const { payload } = action;
  let currentPlayerTools;
  let waitingPlayerTools;
  let waitingPlayerGraveyardTools;
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
      currentPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.currentPlayer]
      );
      waitingPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.waitingPlayer]
      );
      waitingPlayerGraveyardTools =
        state.playerToolsGraveyard[state.waitingPlayer];
      currentPlayerTools[payload] =
        currentPlayerTools[state.chosenTool as string];
      delete currentPlayerTools[state.chosenTool as string];
      currentPlayerTools[payload] = {
        ...currentPlayerTools[payload],
        specialCases: toolSpecialInformation(
          state.chosenTool,
          payload,
          currentPlayerTools[payload].type,
          currentPlayerTools[payload].specialCases
        ),
      };
      waitingPlayerGraveyardTools[payload] = waitingPlayerTools[payload];
      delete waitingPlayerTools[payload];
      return {
        ...state,
        playersTools: {
          ...state.playersTools,
          [state.currentPlayer]: currentPlayerTools,
          [state.waitingPlayer]: waitingPlayerTools,
        },
        playerToolsGraveyard: {
          ...state.playerToolsGraveyard,
          [state.waitingPlayer]: waitingPlayerGraveyardTools,
        },
      };
    case ActionType.MOVE_EN_PASSANT_PLAYER_TOOL:
      currentPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.currentPlayer]
      );
      waitingPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.waitingPlayer]
      );
      waitingPlayerGraveyardTools =
        state.playerToolsGraveyard[state.waitingPlayer];
      currentPlayerTools[payload.pawnDestination] =
        currentPlayerTools[state.chosenTool as string];
      delete currentPlayerTools[state.chosenTool as string];
      currentPlayerTools[payload.pawnDestination] = {
        ...currentPlayerTools[payload.pawnDestination],
        specialCases: toolSpecialInformation(
          state.chosenTool,
          payload.pawnDestination,
          currentPlayerTools[payload.pawnDestination].type,
          currentPlayerTools[payload.pawnDestination].specialCases
        ),
      };
      waitingPlayerGraveyardTools[payload.pawnToKill] =
        waitingPlayerTools[payload.pawnToKill];
      delete waitingPlayerTools[payload.pawnToKill];
      return {
        ...state,
        playersTools: {
          ...state.playersTools,
          [state.currentPlayer]: currentPlayerTools,
          [state.waitingPlayer]: waitingPlayerTools,
        },
        playerToolsGraveyard: {
          ...state.playerToolsGraveyard,
          [state.waitingPlayer]: waitingPlayerGraveyardTools,
        },
      };
    case ActionType.MOVE_PLAYER_TOOL:
      currentPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.currentPlayer]
      );
      waitingPlayerTools = removeAllMovedbyTwo(
        state.playersTools[state.waitingPlayer]
      );
      currentPlayerTools[payload] =
        currentPlayerTools[state.chosenTool as string];
      delete currentPlayerTools[state.chosenTool as string];
      currentPlayerTools[payload] = {
        ...currentPlayerTools[payload],
        specialCases: toolSpecialInformation(
          state.chosenTool,
          payload,
          currentPlayerTools[payload].type,
          currentPlayerTools[payload].specialCases
        ),
      };
      return {
        ...state,
        playersTools: {
          ...state.playersTools,
          [state.currentPlayer]: currentPlayerTools,
          [state.waitingPlayer]: waitingPlayerTools,
        },
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
