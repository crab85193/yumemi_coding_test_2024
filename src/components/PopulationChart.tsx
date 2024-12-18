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

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationCategory {
  label: string;
  data: PopulationData[];
}

interface PopulationChartProps {
  data: PopulationCategory[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("総人口");

  const selectedData = data.find(
    (category) => category.label === selectedCategory
  );

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div>
        {data.map((category) => (
          <button
            key={category.label}
            onClick={() => setSelectedCategory(category.label)}
            style={{
              margin: "5px",
              padding: "10px",
              backgroundColor:
                category.label === selectedCategory ? "#007bff" : "#e0e0e0",
              color: category.label === selectedCategory ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
            }}
          >
            {category.label}
          </button>
        ))}
      </div>
      {selectedData ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={selectedData.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
};

export default PopulationChart;
