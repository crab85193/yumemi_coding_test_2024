import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PopulationSelector from "./../components/PopulationSelector";
import { fetchPopulation } from "../api/population";
import { Prefecture } from "../types/prefecture";
import { PopulationCategory } from "../types/population";

jest.mock("../api/population");

describe("PopulationSelector", () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ];

  it("都道府県を選択し、人口データが表示される", async () => {
    const mockPopulationData: PopulationCategory[] = [
      {
        label: "年少人口",
        data: [{ year: 1960, value: 1681479, rate: 33.37 }],
      },
    ];

    (fetchPopulation as jest.Mock).mockResolvedValue(mockPopulationData);

    render(<PopulationSelector prefectures={mockPrefectures} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    await waitFor(() => screen.getByText("年少人口"));

    expect(screen.getByText("年少人口")).toBeInTheDocument();
    expect(
      screen.getByText("1960: 1681479人 (比率: 33.37%)")
    ).toBeInTheDocument();
  });

  it("人口データの取得中にエラーメッセージが表示される", async () => {
    (fetchPopulation as jest.Mock).mockRejectedValue(new Error("API Error"));

    render(<PopulationSelector prefectures={mockPrefectures} />);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    await waitFor(() => screen.getByText(/人口データの取得に失敗しました/i));

    expect(
      screen.getByText(/人口データの取得に失敗しました/i)
    ).toBeInTheDocument();
  });
});
