import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrefectureCheckbox from "../components/PrefectureCheckbox";

const mockPrefectures = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
];

describe("PrefectureCheckboxコンポーネント", () => {
  it("すべて選択ボタンが正しく動作する", () => {
    const mockOnSelect = jest.fn();
    const mockOnSelectAll = jest.fn();
    const mockOnClearSelection = jest.fn();

    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
        onSelectAll={mockOnSelectAll}
        onClearSelection={mockOnClearSelection}
      />
    );

    const selectAllButton = screen.getByText("すべて選択");
    fireEvent.click(selectAllButton);

    expect(mockOnSelectAll).toHaveBeenCalledWith([1, 2, 3]);
  });

  it("選択をクリアボタンが正しく動作する", () => {
    const mockOnSelect = jest.fn();
    const mockOnSelectAll = jest.fn();
    const mockOnClearSelection = jest.fn();

    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
        onSelectAll={mockOnSelectAll}
        onClearSelection={mockOnClearSelection}
      />
    );

    const clearButton = screen.getByText("選択をクリア");
    fireEvent.click(clearButton);

    expect(mockOnClearSelection).toHaveBeenCalled();
  });
});
