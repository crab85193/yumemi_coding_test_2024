import { create } from "zustand";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefecturesState {
  prefectures: Prefecture[];
  selectedPrefectures: number[];
  setPrefectures: (prefectures: Prefecture[]) => void;
  togglePrefecture: (prefCode: number) => void;
  selectAllPrefectures: (prefCodes: number[]) => void;
  clearSelection: () => void;
  selectAll: (prefCodes: number[]) => void;
}

const usePrefecturesStore = create<PrefecturesState>((set) => ({
  prefectures: [],
  selectedPrefectures: [],
  setPrefectures: (prefectures) => set({ prefectures }),
  togglePrefecture: (prefCode) =>
    set((state) => ({
      selectedPrefectures: state.selectedPrefectures.includes(prefCode)
        ? state.selectedPrefectures.filter((code) => code !== prefCode)
        : [...state.selectedPrefectures, prefCode],
    })),
  selectAllPrefectures: (prefCodes: number[]) =>
    set({ selectedPrefectures: prefCodes }),
  clearSelection: () => set({ selectedPrefectures: [] }),

  selectAll: (prefCodes: number[]) => set({ selectedPrefectures: prefCodes }),
}));

export default usePrefecturesStore;
