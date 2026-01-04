import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JsonRepairState {
  inputText: string;
  setInputText: (text: string) => void;
  clearInput: () => void;
}

const DEFAULT_INPUT_TEXT = "";

export const useJsonRepairStore = create<JsonRepairState>()(
  persist(
    (set) => ({
      inputText: DEFAULT_INPUT_TEXT,
      setInputText: (text) => set({ inputText: text }),
      clearInput: () => set({ inputText: "" }),
    }),
    {
      name: "etoolbox-json-repair",
    },
  ),
);

