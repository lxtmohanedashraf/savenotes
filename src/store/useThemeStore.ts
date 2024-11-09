import { create } from "zustand";

export type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggleTheme: () =>
    set((state: ThemeStore) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
