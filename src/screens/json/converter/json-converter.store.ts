import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DEFAULT_ROOT_CLASS_NAME,
  DEFAULT_SOURCE_TEXT,
  DEFAULT_SOURCE_TYPE,
  DEFAULT_TARGET_LANGUAGE,
} from "./json-converter.types";
import type { SourceType } from "./json-converter.types";

interface JsonConverterState {
  sourceText: string;
  sourceType: SourceType;
  targetLanguage: string;
  rootClassName: string;
  setSourceText: (text: string) => void;
  setSourceType: (type: SourceType) => void;
  setTargetLanguage: (language: string) => void;
  setRootClassName: (name: string) => void;
  clearAll: () => void;
}

export const useJsonConverterStore = create<JsonConverterState>()(
  persist(
    (set) => ({
      sourceText: DEFAULT_SOURCE_TEXT,
      sourceType: DEFAULT_SOURCE_TYPE,
      targetLanguage: DEFAULT_TARGET_LANGUAGE,
      rootClassName: DEFAULT_ROOT_CLASS_NAME,
      setSourceText: (text) => set({ sourceText: text }),
      setSourceType: (type) => set({ sourceType: type }),
      setTargetLanguage: (language) => set({ targetLanguage: language }),
      setRootClassName: (name) => set({ rootClassName: name }),
      clearAll: () =>
        set({
          sourceText: "",
          sourceType: DEFAULT_SOURCE_TYPE,
          targetLanguage: DEFAULT_TARGET_LANGUAGE,
          rootClassName: DEFAULT_ROOT_CLASS_NAME,
        }),
    }),
    {
      name: "etoolbox-json-converter",
    },
  ),
);

