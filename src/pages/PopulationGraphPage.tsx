import React, { useEffect, useState } from "react";
import PrefectureCheckbox from "../components/PrefectureCheckbox";
import PopulationChart from "../components/PopulationChart";
import usePrefecturesStore from "../store/usePrefecturesStore";
import { fetchPrefectures } from "../api/prefectures";
import { fetchPopulation } from "../api/population";
import { Prefecture } from "../types/prefecture";
import { PopulationData } from "../types/population";

interface PrefectureCategoryData {
  prefName: string;
  data: PopulationData[];
}

interface AllCategoriesData {
  [categoryName: string]: PrefectureCategoryData[];
}

const categories = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

const PopulationGraphPage: React.FC = () => {
  const { selectedPrefectures, prefectures, setPrefectures } =
    usePrefecturesStore();
  const [allCategoriesData, setAllCategoriesData] = useState<AllCategoriesData>(
    {}
  );
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
    const fetchPopulationData = async () => {
      setLoading(true);
      setError(null);

      const newAllCategoriesData: AllCategoriesData = {
        総人口: [],
        年少人口: [],
        生産年齢人口: [],
        老年人口: [],
      };

      try {
        for (const prefCode of selectedPrefectures) {
          const categoriesData = await fetchPopulation(prefCode.toString());
          const prefName =
            prefectures.find((p) => p.prefCode === Number(prefCode))
              ?.prefName || prefCode.toString();

          for (const catName of categories) {
            const catData = categoriesData.find((c) => c.label === catName);
            if (catData) {
              newAllCategoriesData[catName].push({
                prefName: prefName,
                data: catData.data,
              });
            }
          }
        }
        setAllCategoriesData(newAllCategoriesData);
      } catch (err) {
        setError("人口データの取得に失敗しました:" + err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedPrefectures.length > 0) {
      fetchPopulationData();
    } else {
      setAllCategoriesData({
        総人口: [],
        年少人口: [],
        生産年齢人口: [],
        老年人口: [],
      });
    }
  }, [selectedPrefectures, prefectures]);

  const { togglePrefecture, selectAllPrefectures, clearSelection } =
    usePrefecturesStore.getState();

  return (
    <div>
      <h1>人口推移グラフ</h1>
      <PrefectureCheckbox
        prefectures={prefectures}
        onSelect={(prefCode: number) => togglePrefecture(prefCode)}
        onSelectAll={(prefCodes: number[]) => selectAllPrefectures(prefCodes)}
        onClearSelection={clearSelection}
      />
      {selectedPrefectures.length === 0 && <p>都道府県を選択してください。</p>}
      {loading && <p>データを取得中...</p>}
      {error && <p>{error}</p>}
      <PopulationChart allCategoriesData={allCategoriesData} />
    </div>
  );
};

export default PopulationGraphPage;
