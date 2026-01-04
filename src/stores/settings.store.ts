import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface SettingsState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: "light",
      setThemeMode: (mode) => set({ themeMode: mode }),
      toggleThemeMode: () =>
        set((state) => ({
          themeMode: state.themeMode === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "etoolbox-settings",
    },
  ),
);

export const useIsDarkMode = (): boolean => {
  const themeMode = useSettingsStore((state) => state.themeMode);
  return themeMode === "dark";
};

export const useThemeToggler = (): VoidFunction => {
  return useSettingsStore((state) => state.toggleThemeMode);
};
