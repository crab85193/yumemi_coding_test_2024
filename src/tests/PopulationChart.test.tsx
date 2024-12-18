import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PopulationChart from "../components/PopulationChart";

jest.mock("recharts", () => {
  const OriginalRecharts = jest.requireActual("recharts");
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

const mockAllCategoriesData = {
  総人口: [
    {
      prefName: "北海道",
      data: [
        { year: 1960, value: 5000, rate: 0 },
        { year: 1965, value: 6000, rate: 0 },
      ],
    },
    {
      prefName: "青森県",
      data: [
        { year: 1960, value: 4500, rate: 0 },
        { year: 1965, value: 5500, rate: 0 },
      ],
    },
  ],
  年少人口: [
    {
      prefName: "北海道",
      data: [
        { year: 1960, value: 2000, rate: 0 },
        { year: 1965, value: 2500, rate: 0 },
      ],
    },
    {
      prefName: "青森県",
      data: [
        { year: 1960, value: 1800, rate: 0 },
        { year: 1965, value: 2300, rate: 0 },
      ],
    },
  ],
  生産年齢人口: [],
  老年人口: [],
};

describe("PopulationChartコンポーネントのテスト", () => {
  it("グラフが正しくレンダリングされる", () => {
    render(<PopulationChart allCategoriesData={mockAllCategoriesData} />);
    expect(screen.getByText("総人口")).toBeInTheDocument();
    expect(screen.getByText("年少人口")).toBeInTheDocument();
    expect(screen.getByText("生産年齢人口")).toBeInTheDocument();
    expect(screen.getByText("老年人口")).toBeInTheDocument();
  });

  it("カテゴリ切り替えボタンが動作する", () => {
    render(<PopulationChart allCategoriesData={mockAllCategoriesData} />);
    const button = screen.getByText("年少人口");
    fireEvent.click(button);
    expect(button).toHaveStyle("background-color: #007bff");
  });

  it("データがない場合にエラーメッセージが表示される", () => {
    const emptyData = {
      総人口: [],
      年少人口: [],
      生産年齢人口: [],
      老年人口: [],
    };
    render(<PopulationChart allCategoriesData={emptyData} />);
    expect(
      screen.getByText("選択中のカテゴリのデータがありません")
    ).toBeInTheDocument();
  });
});
