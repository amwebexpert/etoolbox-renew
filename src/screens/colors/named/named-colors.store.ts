import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DEFAULT_FAMILY,
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "./named-colors.utils";

interface NamedColorsState {
  family: string;
  filter: string;
  page: number;
  pageSize: number;
  setFamily: (family: string) => void;
  setFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

export const useNamedColorsStore = create<NamedColorsState>()(
  persist(
    (set) => ({
      family: DEFAULT_FAMILY,
      filter: DEFAULT_FILTER,
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      setFamily: (family) => set({ family, page: DEFAULT_PAGE }),
      setFilter: (filter) => set({ filter, page: DEFAULT_PAGE }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) => set({ pageSize, page: DEFAULT_PAGE }),
      resetFilters: () =>
        set({
          family: DEFAULT_FAMILY,
          filter: DEFAULT_FILTER,
          page: DEFAULT_PAGE,
        }),
    }),
    {
      name: "etoolbox-named-colors",
    },
  ),
);

