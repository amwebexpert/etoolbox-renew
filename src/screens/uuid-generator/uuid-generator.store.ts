import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_QUANTITY, DEFAULT_VERSION, type UuidVersion } from "./uuid-generator.utils";

interface UuidGeneratorState {
  version: UuidVersion;
  quantity: number;
  generated: string;
  setVersion: (version: UuidVersion) => void;
  setQuantity: (quantity: number) => void;
  setGenerated: (result: string) => void;
  clearAll: () => void;
}

export const useUuidGeneratorStore = create<UuidGeneratorState>()(
  persist(
    (set) => ({
      version: DEFAULT_VERSION,
      quantity: DEFAULT_QUANTITY,
      generated: "",
      setVersion: (version) => set({ version }),
      setQuantity: (quantity) => set({ quantity }),
      setGenerated: (generated) => set({ generated }),
      clearAll: () =>
        set({
          version: DEFAULT_VERSION,
          quantity: DEFAULT_QUANTITY,
          generated: "",
        }),
    }),
    {
      name: "etoolbox-uuid-generator",
    },
  ),
);

