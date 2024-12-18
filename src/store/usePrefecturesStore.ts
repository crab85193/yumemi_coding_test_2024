import { create } from "zustand";
import { Prefecture } from "../types/prefecture";

interface PrefecturesState {
  selectedPrefectures: number[];
  prefectures: Prefecture[];
  togglePrefecture: (prefCode: number) => void;
  setPrefectures: (prefectures: Prefecture[]) => void;
  clearSelection: () => void;
}

const usePrefecturesStore = create<PrefecturesState>((set) => ({
  selectedPrefectures: [],
  prefectures: [],
  togglePrefecture: (prefCode: number) =>
    set((state) => ({
      selectedPrefectures: state.selectedPrefectures.includes(prefCode)
        ? state.selectedPrefectures.filter((code) => code !== prefCode)
        : [...state.selectedPrefectures, prefCode],
    })),
  setPrefectures: (prefectures: Prefecture[]) => set(() => ({ prefectures })),
  clearSelection: () =>
    set(() => ({
      selectedPrefectures: [],
    })),
}));

export default usePrefecturesStore;
