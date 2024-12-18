import React, { useEffect, useState } from "react";
import PrefectureCheckbox from "../components/PrefectureCheckbox";
import PopulationChart from "../components/PopulationChart";
import usePrefecturesStore from "../store/usePrefecturesStore";
import { fetchPrefectures } from "../api/prefectures";
import { fetchPopulation } from "../api/population";
import { Prefecture } from "../types/prefecture";
import { PopulationData } from "../types/population";

const PopulationGraphPage: React.FC = () => {
  const { selectedPrefectures, prefectures, setPrefectures } =
    usePrefecturesStore();
  const [populationData, setPopulationData] = useState<{
    [key: string]: PopulationData[];
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePrefectures = async (): Promise<void> => {
      try {
        const fetchedPrefectures: Prefecture[] = await fetchPrefectures();
        setPrefectures(fetchedPrefectures);
      } catch (err) {
        setError("都道府県データの取得に失敗しました:" + err);
      }
    };
    initializePrefectures();
  }, [setPrefectures]);

  useEffect(() => {
    const fetchPopulationData = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      const newPopulationData: { [key: string]: PopulationData[] } = {};

      try {
        for (const prefCode of selectedPrefectures) {
          const categories = await fetchPopulation(prefCode.toString());
          const totalPopulation = categories.find(
            (category) => category.label === "総人口"
          )?.data;

          if (totalPopulation) {
            newPopulationData[prefCode.toString()] = totalPopulation;
          }
        }
        setPopulationData(newPopulationData);
      } catch (err) {
        setError("人口データの取得に失敗しました:" + err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPrefectures.length > 0) {
      fetchPopulationData();
    } else {
      setPopulationData({});
    }
  }, [selectedPrefectures]);

  return (
    <div>
      <h1>人口推移グラフ</h1>
      <PrefectureCheckbox
        prefectures={prefectures}
        onSelect={(prefCode: number) => {
          const { togglePrefecture } = usePrefecturesStore.getState();
          togglePrefecture(prefCode);
        }}
      />
      {selectedPrefectures.length === 0 && <p>都道府県を選択してください。</p>}
      {loading && <p>データを取得中...</p>}
      {error && <p>{error}</p>}
      <PopulationChart
        data={populationData}
        prefectureNames={prefectures.reduce(
          (acc, pref) => ({ ...acc, [pref.prefCode]: pref.prefName }),
          {}
        )}
      />
    </div>
  );
};

export default PopulationGraphPage;
