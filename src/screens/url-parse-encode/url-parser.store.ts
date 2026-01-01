import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UrlParserState {
  inputUrl: string;
  setInputUrl: (url: string) => void;
}

const DEFAULT_URL =
  "https://codesandbox.io/dashboard/home?lastProject=WowWWW&name=Smith";

export const useUrlParserStore = create<UrlParserState>()(
  persist(
    (set) => ({
      inputUrl: DEFAULT_URL,
      setInputUrl: (url) => set({ inputUrl: url }),
    }),
    {
      name: "etoolbox-url-parser",
    }
  )
);

