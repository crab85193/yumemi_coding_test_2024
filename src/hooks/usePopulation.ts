import { useState, useEffect } from "react";
import { fetchPopulation } from "../api/population";
import { PopulationCategory } from "../types/population";

const usePopulation = (prefCode: number | null) => {
  const [data, setData] = useState<PopulationCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prefCode) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchPopulation(prefCode.toString());
        setData(result);
      } catch (err) {
        setError("人口データの取得に失敗しました. " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [prefCode]);

  return { data, loading, error };
};

export default usePopulation;
