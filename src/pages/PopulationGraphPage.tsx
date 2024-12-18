import React, { useEffect, useState } from "react";
import PrefectureCheckbox from "../components/PrefectureCheckbox";
import PopulationChart from "../components/PopulationChart";
import usePopulation from "../hooks/usePopulation";
import usePrefecturesStore from "../store/usePrefecturesStore";
import { fetchPrefectures } from "../api/prefectures";

const PopulationGraphPage = () => {
  const { selectedPrefectures, prefectures, setPrefectures } =
    usePrefecturesStore();
  const [currentPref, setCurrentPref] = useState<number | null>(null);
  const { data, loading, error } = usePopulation(currentPref);

  useEffect(() => {
    const initializePrefectures = async () => {
      try {
        const fetchedPrefectures = await fetchPrefectures();
        setPrefectures(fetchedPrefectures);
      } catch (err) {
        throw new Error("都道府県データの取得に失敗しました:" + err);
      }
    };
    initializePrefectures();
  }, [setPrefectures]);

  const handlePrefectureSelect = (prefCode: number) => {
    setCurrentPref(prefCode);
  };

  return (
    <div>
      <h1>人口推移グラフ</h1>
      <PrefectureCheckbox
        prefectures={prefectures}
        onSelect={handlePrefectureSelect}
      />
      {selectedPrefectures.length === 0 && <p>都道府県を選択してください。</p>}
      {loading && <p>データを取得中...</p>}
      {error && <p>{error}</p>}
      <PopulationChart data={data} />
    </div>
  );
};

export default PopulationGraphPage;
