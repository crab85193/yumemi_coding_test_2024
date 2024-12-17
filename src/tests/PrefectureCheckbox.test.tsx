import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrefectureCheckbox from "./../components/PrefectureCheckbox";
import { Prefecture } from "../types/prefecture";

const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
];

describe("PrefectureCheckbox", () => {
  it("都道府県のチェックボックスを表示する", () => {
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        selectedPrefectures={[]}
        onSelect={() => {}}
      />
    );

    mockPrefectures.forEach((pref) => {
      expect(screen.getByLabelText(pref.prefName)).toBeInTheDocument();
    });
  });

  it("チェックボックスをクリックすると選択状態が変更される", () => {
    const mockOnSelect = jest.fn();
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        selectedPrefectures={[]}
        onSelect={mockOnSelect}
      />
    );

    const checkbox = screen.getByLabelText("北海道");
    fireEvent.click(checkbox);

    expect(mockOnSelect).toHaveBeenCalledWith(["1"]);
  });

  it("選択済みの都道府県のチェックボックスはチェックされている", () => {
    render(
      <PrefectureCheckbox
        prefectures={mockPrefectures}
        selectedPrefectures={["1"]}
        onSelect={() => {}}
      />
    );

    expect(screen.getByLabelText("北海道")).toBeChecked();
    expect(screen.getByLabelText("青森県")).not.toBeChecked();
  });
});
