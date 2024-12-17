import React, { useState } from "react";
import { fetchPopulation } from "../api/population"; // 人口データを取得するAPI
import { Prefecture } from "../types/prefecture"; // 都道府県の型
import { PopulationCategory } from "../types/population"; // 人口データのカテゴリ型

interface PopulationSelectorProps {
  prefectures: Prefecture[];
}

const PopulationSelector: React.FC<PopulationSelectorProps> = ({
  prefectures,
}) => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(
    null
  );
  const [populationData, setPopulationData] = useState<
    PopulationCategory[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrefectureChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const prefCode = event.target.value;
    setSelectedPrefecture(prefCode);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchPopulation(prefCode);
      setPopulationData(data);
    } catch (error) {
      setError("人口データの取得に失敗しました. " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>人口データ選択</h2>
      <select
        onChange={handlePrefectureChange}
        value={selectedPrefecture || ""}
      >
        <option value="">都道府県を選択</option>
        {prefectures.map((prefecture) => (
          <option key={prefecture.prefCode} value={prefecture.prefCode}>
            {prefecture.prefName}
          </option>
        ))}
      </select>

      {loading && <p>読み込み中...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {populationData && (
        <div>
          <h3>年別人口データ</h3>
          {populationData.map((category) => (
            <div key={category.label}>
              <h4>{category.label}</h4>
              <ul>
                {category.data.map((entry) => (
                  <li key={entry.year}>
                    {entry.year}: {entry.value}人 (比率: {entry.rate}%)
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopulationSelector;
