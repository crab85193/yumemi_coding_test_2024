import React from "react";
import { Prefecture } from "../types/prefecture";

interface PrefectureCheckboxProps {
  prefectures: Prefecture[];
  selectedPrefectures: string[];
  onSelect: (selected: string[]) => void;
}

const PrefectureCheckbox: React.FC<PrefectureCheckboxProps> = ({
  prefectures,
  selectedPrefectures,
  onSelect,
}) => {
  const handleCheckboxChange = (prefCode: string) => {
    if (selectedPrefectures.includes(prefCode)) {
      onSelect(selectedPrefectures.filter((code) => code !== prefCode));
    } else {
      onSelect([...selectedPrefectures, prefCode]);
    }
  };

  return (
    <div>
      <h3>都道府県選択</h3>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={prefecture.prefCode.toString()}
            checked={selectedPrefectures.includes(
              prefecture.prefCode.toString()
            )}
            onChange={() =>
              handleCheckboxChange(prefecture.prefCode.toString())
            }
          />
          <label htmlFor={prefecture.prefCode.toString()}>
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PrefectureCheckbox;
