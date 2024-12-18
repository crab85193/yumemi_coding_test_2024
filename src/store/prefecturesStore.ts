import { create } from "zustand";

interface PrefecturesState {
  selectedPrefectures: number[];
  togglePrefecture: (prefCode: number) => void;
  selectAll: (prefCodes: number[]) => void;
  clearSelection: () => void;
}

const usePrefecturesStore = create<PrefecturesState>((set) => ({
  selectedPrefectures: [],

  togglePrefecture: (prefCode: number) =>
    set((state) => ({
      selectedPrefectures: state.selectedPrefectures.includes(prefCode)
        ? state.selectedPrefectures.filter((code) => code !== prefCode)
        : [...state.selectedPrefectures, prefCode],
    })),

  selectAll: (prefCodes: number[]) =>
    set(() => ({
      selectedPrefectures: prefCodes,
    })),

  clearSelection: () =>
    set(() => ({
      selectedPrefectures: [],
    })),
}));

export default usePrefecturesStore;
