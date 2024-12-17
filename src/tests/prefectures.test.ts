import axios from "axios";
import { fetchPrefectures } from "./../api/prefectures";
import { Prefecture } from "../types/prefecture";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchPrefectures", () => {
  it("正常に都道府県データを取得できる", async () => {
    const mockData: Prefecture[] = [
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
      { prefCode: 3, prefName: "宮城県" },
    ];

    mockedAxios.get.mockResolvedValue({ status: 200, data: mockData });

    const result = await fetchPrefectures();

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YUMEMI_API_URL}/prefectures`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );
  });

  it("APIがエラーを返した場合、エラーをスローする", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));

    await expect(fetchPrefectures()).rejects.toThrow("API Error");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YUMEMI_API_URL}/prefectures`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );
  });
});