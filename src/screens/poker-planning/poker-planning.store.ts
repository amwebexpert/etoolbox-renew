import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { DEFAULT_CARDS_LISTING_CATEGORY } from "./poker-planning.constants";
import type {
  CardsListingCategoryName,
  PokerPlanningSession,
  SocketState,
} from "./poker-planning.types";

interface PokerPlanningState {
  // Persisted settings
  hostName: string;
  roomName: string;
  username: string;
  cardsCategory: CardsListingCategoryName;

  // Session state (not persisted)
  roomUUID: string;
  socketState: SocketState;
  myEstimate: string | undefined;
  isEstimatesVisible: boolean;
  session: PokerPlanningSession | undefined;

  // Actions for persisted settings
  setHostName: (hostName: string) => void;
  setRoomName: (roomName: string) => void;
  setUsername: (username: string) => void;
  setCardsCategory: (cardsCategory: CardsListingCategoryName) => void;

  // Actions for session state
  setRoomUUID: (roomUUID: string) => void;
  setSocketState: (socketState: SocketState) => void;
  setMyEstimate: (estimate: string | undefined) => void;
  setIsEstimatesVisible: (isVisible: boolean) => void;
  setSession: (session: PokerPlanningSession | undefined) => void;

  // Combined actions
  resetSession: () => void;
  clearVotes: () => void;
}

const stateCreator = (
  set: (partial: Partial<PokerPlanningState>) => void
): PokerPlanningState => ({
  // Initial persisted values
  hostName: "",
  roomName: "",
  username: "",
  cardsCategory: DEFAULT_CARDS_LISTING_CATEGORY,

  // Initial session values
  roomUUID: "",
  socketState: "closed",
  myEstimate: undefined,
  isEstimatesVisible: false,
  session: undefined,

  // Setters for persisted settings
  setHostName: (hostName) => set({ hostName }),
  setRoomName: (roomName) => set({ roomName }),
  setUsername: (username) => set({ username }),
  setCardsCategory: (cardsCategory) => set({ cardsCategory }),

  // Setters for session state
  setRoomUUID: (roomUUID) => set({ roomUUID }),
  setSocketState: (socketState) => set({ socketState }),
  setMyEstimate: (estimate) => set({ myEstimate: estimate }),
  setIsEstimatesVisible: (isVisible) => set({ isEstimatesVisible: isVisible }),
  setSession: (session) => set({ session }),

  // Combined actions
  resetSession: () =>
    set({
      roomUUID: "",
      socketState: "closed",
      myEstimate: undefined,
      isEstimatesVisible: false,
      session: undefined,
    }),
  clearVotes: () =>
    set({
      myEstimate: undefined,
      isEstimatesVisible: false,
    }),
});

const PERSISTED_STORE_NAME = "etoolbox-poker-planning";

const persistedStateCreator = persist<PokerPlanningState>(stateCreator, {
  name: PERSISTED_STORE_NAME,
  storage: createJSONStorage(() => localStorage),
  // Only persist user preferences, not session state
  partialize: (state) => ({
    hostName: state.hostName,
    roomName: state.roomName,
    username: state.username,
    cardsCategory: state.cardsCategory,
  }) as PokerPlanningState,
});

export const usePokerPlanningStore = create<PokerPlanningState>()(
  devtools(persistedStateCreator, { name: PERSISTED_STORE_NAME })
);

