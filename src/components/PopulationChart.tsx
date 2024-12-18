import React from "react";
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

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationChartProps {
  data: { [key: string]: PopulationData[] };
  prefectureNames: { [key: number]: string }; // 都道府県コードと都道府県名のマッピング
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  data,
  prefectureNames,
}) => {
  const allYears = Object.values(data)
    .flat()
    .map((entry) => entry.year);

  const uniqueYears = Array.from(new Set(allYears)).sort();

  const combinedData = uniqueYears.map((year) => {
    const entry: { [key: string]: number | string } = { year };
    for (const [prefCode, populationData] of Object.entries(data)) {
      const yearData = populationData.find((d) => d.year === year);
      entry[prefCode] = yearData ? yearData.value : 0;
    }
    return entry;
  });

  return (
    <div style={{ width: "100%", height: "500px" }}>
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
          {Object.keys(data).map((prefCode) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={prefCode}
              name={prefectureNames[Number(prefCode)] || `都道府県 ${prefCode}`}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // ランダム色
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
