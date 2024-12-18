import { act } from "react";
import usePrefecturesStore from "../store/prefecturesStore";

describe("都道府県ストアの動作", () => {
  beforeEach(() => {
    const { getState, setState } = usePrefecturesStore;
    setState(() => getState());
  });

  it("都道府県の選択状態を切り替えられる", () => {
    const { selectedPrefectures, togglePrefecture } =
      usePrefecturesStore.getState();

    expect(selectedPrefectures).toEqual([]);

    act(() => {
      togglePrefecture(1);
    });
    expect(usePrefecturesStore.getState().selectedPrefectures).toEqual([1]);

    act(() => {
      togglePrefecture(1);
    });
    expect(usePrefecturesStore.getState().selectedPrefectures).toEqual([]);
  });

  it("全ての都道府県を選択できる", () => {
    const { selectedPrefectures, selectAll } = usePrefecturesStore.getState();

    expect(selectedPrefectures).toEqual([]);

    act(() => {
      selectAll([1, 2, 3]);
    });
    expect(usePrefecturesStore.getState().selectedPrefectures).toEqual([
      1, 2, 3,
    ]);
  });

  it("選択状態を全て解除できる", () => {
    const { clearSelection, selectAll } = usePrefecturesStore.getState();

    act(() => {
      selectAll([1, 2, 3]);
    });
    expect(usePrefecturesStore.getState().selectedPrefectures).toEqual([
      1, 2, 3,
    ]);

    act(() => {
      clearSelection();
    });
    expect(usePrefecturesStore.getState().selectedPrefectures).toEqual([]);
  });
});
