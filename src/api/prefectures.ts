import axios from "axios";
import { Prefecture } from "../types/prefecture";

export const fetchPrefectures = async (): Promise<Prefecture[]> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_YUMEMI_API_URL}/prefectures`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch prefectures");
    }

    return response.data as Prefecture[];
  } catch (error) {
    throw new Error("Error fetching prefectures: " + error);
  }
};
