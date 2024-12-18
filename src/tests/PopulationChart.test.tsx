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

const mockData = {
  総人口: [
    { year: 1960, value: 5000 },
    { year: 1965, value: 6000 },
  ],
  年少人口: [
    { year: 1960, value: 2000 },
    { year: 1965, value: 2500 },
  ],
};

// テスト用の都道府県名マッピング
const mockPrefectureNames = {
  1: "北海道",
  2: "青森県",
  3: "岩手県",
};

describe("PopulationChartコンポーネントのテスト", () => {
  it("グラフが正しくレンダリングされる", () => {
    render(
      <PopulationChart data={mockData} prefectureNames={mockPrefectureNames} />
    );
    expect(screen.getByText("総人口")).toBeInTheDocument();
    expect(screen.getByText("年少人口")).toBeInTheDocument();
  });

  it("カテゴリ切り替えボタンが動作する", () => {
    render(
      <PopulationChart data={mockData} prefectureNames={mockPrefectureNames} />
    );
    const button = screen.getByText("年少人口");
    fireEvent.click(button);
    expect(screen.getByText("年少人口")).toHaveStyle(
      "background-color: #007bff"
    );
  });

  it("データがない場合にエラーメッセージが表示される", () => {
    render(<PopulationChart data={{}} prefectureNames={mockPrefectureNames} />);
    expect(screen.getByText("データがありません")).toBeInTheDocument();
  });
});
