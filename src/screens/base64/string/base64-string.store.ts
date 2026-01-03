import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Base64StringState {
  inputText: string;
  outputText: string;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  swapContent: () => void;
}

export const useBase64StringStore = create<Base64StringState>()(
  persist(
    (set, get) => ({
      inputText: "Chuck Norris can encode and decode Base64 with his mind.",
      outputText: "",
      setInputText: (text) => set({ inputText: text }),
      setOutputText: (text) => set({ outputText: text }),
      swapContent: () => {
        const { outputText } = get();
        set({ inputText: outputText, outputText: "" });
      },
    }),
    {
      name: "etoolbox-base64-string",
    },
  ),
);

