import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  let mockOnSelect: jest.Mock;

  beforeEach(() => {
    mockOnSelect = jest.fn();
  });

  it("チェックボックスをクリックすると状態が切り替わる", () => {
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
      />
    );

    const checkbox = screen.getByLabelText("北海道");
    fireEvent.click(checkbox);

    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  it("全て選択ボタンが正しく動作する", () => {
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
      />
    );

    const selectAllButton = screen.getByText("すべて選択");
    fireEvent.click(selectAllButton);

    expect(mockOnSelect).toHaveBeenCalledTimes(mockPrefectures.length);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
    expect(mockOnSelect).toHaveBeenCalledWith(2);
    expect(mockOnSelect).toHaveBeenCalledWith(3);
  });

  it("選択をクリアボタンが正しく動作する", () => {
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        onSelect={mockOnSelect}
      />
    );

    const clearButton = screen.getByText("選択をクリア");
    fireEvent.click(clearButton);

    expect(mockOnSelect).toHaveBeenCalledWith(0);
  });
});
