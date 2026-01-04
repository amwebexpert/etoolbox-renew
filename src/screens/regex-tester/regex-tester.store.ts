import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { DEFAULT_INPUT_TEXT, DEFAULT_REGEX, type ExtractFormat } from "./regex-tester.utils";

interface RegexTesterState {
  pattern: string;
  inputText: string;
  flags: string[];
  extractFormat: ExtractFormat;
  setPattern: (pattern: string) => void;
  setInputText: (text: string) => void;
  setFlags: (flags: string[]) => void;
  toggleFlag: (flag: string) => void;
  setExtractFormat: (format: ExtractFormat) => void;
  clearAll: () => void;
}

export const useRegexTesterStore = create<RegexTesterState>()(
  persist(
    immer((set) => ({
      pattern: DEFAULT_REGEX,
      inputText: DEFAULT_INPUT_TEXT,
      flags: ["g"],
      extractFormat: "comma",
      setPattern: (pattern) =>
        set((state) => {
          state.pattern = pattern;
        }),
      setInputText: (text) =>
        set((state) => {
          state.inputText = text;
        }),
      setFlags: (flags) =>
        set((state) => {
          state.flags = flags;
        }),
      toggleFlag: (flag) =>
        set((state) => {
          const index = state.flags.indexOf(flag);
          if (index >= 0) {
            state.flags.splice(index, 1);
          } else {
            state.flags.push(flag);
          }
        }),
      setExtractFormat: (format) =>
        set((state) => {
          state.extractFormat = format;
        }),
      clearAll: () =>
        set((state) => {
          state.pattern = "";
          state.inputText = "";
          state.flags = ["g"];
          state.extractFormat = "comma";
        }),
    })),
    {
      name: "etoolbox-regex-tester",
    },
  ),
);
