import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UrlEncoderState {
  inputText: string;
  outputText: string;
  setInputText: (text: string) => void;
  setOutputText: (text: string) => void;
  swapContent: () => void;
}

export const useUrlEncoderStore = create<UrlEncoderState>()(
  persist(
    (set, get) => ({
      inputText: "Chuck Norris can chuck more wood than a woodchuck could.",
      outputText: "",
      setInputText: (text) => set({ inputText: text }),
      setOutputText: (text) => set({ outputText: text }),
      swapContent: () => {
        const { outputText } = get();
        set({ inputText: outputText, outputText: "" });
      },
    }),
    {
      name: "etoolbox-url-encoder",
    }
  )
);

