import axios from "axios";
import { PopulationCategory, PopulationResponse } from "../types/population";

export const fetchPopulation = async (
  prefCode: string
): Promise<PopulationCategory[]> => {
  try {
    const response = await axios.get<PopulationResponse>(
      `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch population data");
    }

    return response.data.result.data.map((category) => ({
      label: category.label,
      data: category.data.map((dataItem) => ({
        year: dataItem.year,
        value: dataItem.value,
        rate: dataItem.rate,
      })),
    }));
  } catch (error) {
    throw new Error("Error fetching population data: " + error);
  }
};
