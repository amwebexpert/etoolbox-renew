import { create } from "zustand";
import { persist } from "zustand/middleware";

interface JwtDecoderState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useJwtDecoderStore = create<JwtDecoderState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: "etoolbox-jwt-decoder",
    },
  ),
);

