import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/PopulationChart.css";

interface PopulationData {
  year: number;
  value: number;
  rate: number;
}

interface PrefectureCategoryData {
  prefName: string;
  data: PopulationData[];
}

interface AllCategoriesData {
  [categoryName: string]: PrefectureCategoryData[];
}

interface PopulationChartProps {
  allCategoriesData: AllCategoriesData;
}

const categories = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const colorMap: { [prefName: string]: string } = {};

const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getColorForPrefName = (pName: string) => {
  if (!colorMap[pName]) {
    colorMap[pName] = generateRandomColor();
  }
  return colorMap[pName];
};

const PopulationChart: React.FC<PopulationChartProps> = ({
  allCategoriesData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const prefectureDataArray = allCategoriesData[selectedCategory] || [];

  if (prefectureDataArray.length === 0) {
    return <span>選択中のカテゴリのデータがありません</span>;
  }

  const allYears = prefectureDataArray.flatMap((p) =>
    p.data.map((d) => d.year)
  );
  const uniqueYears = Array.from(new Set(allYears)).sort((a, b) => a - b);

  const combinedData = uniqueYears.map((year) => {
    const entry: { [key: string]: number | string } = { year };
    for (const pData of prefectureDataArray) {
      const yearData = pData.data.find((d) => d.year === year);
      entry[pData.prefName] = yearData ? yearData.value : 0;
    }
    return entry;
  });

  const prefNames = prefectureDataArray.map((p) => p.prefName);

  return (
    <div className="population-chart population-chart__wrapper">
      <div className="button-area">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cat === selectedCategory ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {prefNames.map((pName) => (
            <Line
              key={pName}
              type="monotone"
              dataKey={pName}
              name={pName}
              stroke={getColorForPrefName(pName)}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
