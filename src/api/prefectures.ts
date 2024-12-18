import axios from "axios";
import { Prefecture } from "../types/prefecture";

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(
      `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures`,
      {
        headers: { "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY },
      }
    );

    return response.data.result as Prefecture[];
  } catch (error) {
    throw new Error("Error fetching prefectures: " + error);
  }
};
