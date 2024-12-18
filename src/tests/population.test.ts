import axios from "axios";
import { fetchPopulation } from "../api/population";
import { PopulationCategory } from "../types/population";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchPopulation", () => {
  it("正常に人口データを取得できる", async () => {
    const mockData: PopulationCategory[] = [
      {
        label: "年少人口",
        data: [{ year: 1960, value: 1681479, rate: 33.37 }],
      },
    ];

    const mockResponse = {
      message: "success",
      result: {
        boundaryYear: 2020,
        data: mockData,
      },
    };

    mockedAxios.get.mockResolvedValue({ status: 200, data: mockResponse });

    const prefCode = "1";

    const result = await fetchPopulation(prefCode);

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YUMEMI_API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );
  });

  it("APIがエラーを返した場合、エラーをスローする", async () => {
    mockedAxios.get.mockRejectedValue(new Error("API Error"));

    const prefCode = "1";

    await expect(fetchPopulation(prefCode)).rejects.toThrow(
      "Error fetching population data: Error: API Error"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YUMEMI_API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_YUMEMI_API_KEY!,
        },
      }
    );
  });
});
