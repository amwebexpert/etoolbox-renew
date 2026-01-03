import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JsonFormatterState {
  inputText: string;
  setInputText: (text: string) => void;
}

const DEFAULT_INPUT_TEXT = '{ "firstName": "Chuck", "lastName": "Norris" }';

export const useJsonFormatterStore = create<JsonFormatterState>()(
  persist(
    (set) => ({
      inputText: DEFAULT_INPUT_TEXT,
      setInputText: (text) => set({ inputText: text }),
    }),
    {
      name: "etoolbox-json-formatter",
    },
  ),
);

