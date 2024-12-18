import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import usePrefecturesStore from "../store/prefecturesStore";
import PrefectureCheckbox from "../components/PrefectureCheckbox";

jest.mock("../store/prefecturesStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("PrefectureCheckboxコンポーネントの動作", () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
    { prefCode: 3, prefName: "岩手県" },
  ];

  let mockTogglePrefecture: jest.Mock;
  let mockSelectAll: jest.Mock;
  let mockClearSelection: jest.Mock;

  beforeEach(() => {
    mockTogglePrefecture = jest.fn();
    mockSelectAll = jest.fn();
    mockClearSelection = jest.fn();

    (
      usePrefecturesStore as jest.MockedFunction<typeof usePrefecturesStore>
    ).mockImplementation(() => ({
      selectedPrefectures: [],
      togglePrefecture: mockTogglePrefecture,
      selectAll: mockSelectAll,
      clearSelection: mockClearSelection,
    }));
  });

  it("都道府県が正しくレンダリングされる", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    mockPrefectures.forEach((pref) => {
      expect(screen.getByLabelText(pref.prefName)).toBeInTheDocument();
    });
  });

  it("チェックボックスをクリックすると状態が切り替わる", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    const checkbox = screen.getByLabelText("北海道");
    fireEvent.click(checkbox);

    expect(mockTogglePrefecture).toHaveBeenCalledWith(1);
  });

  it("全て選択ボタンが正しく動作する", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    const selectAllButton = screen.getByText("すべて選択");
    fireEvent.click(selectAllButton);

    expect(mockSelectAll).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("選択をクリアボタンが正しく動作する", () => {
    render(<PrefectureCheckbox prefectures={mockPrefectures} />);

    const clearButton = screen.getByText("選択をクリア");
    fireEvent.click(clearButton);

    expect(mockClearSelection).toHaveBeenCalled();
  });
});
