import React from "react";
import { Prefecture } from "../types/prefecture";

interface PrefectureCheckboxProps {
  prefectures: Prefecture[];
  onSelect: (prefCode: number) => void;
}

const PrefectureCheckbox: React.FC<PrefectureCheckboxProps> = ({
  prefectures = [],
  onSelect,
}) => {
  if (!Array.isArray(prefectures)) {
    return null;
  }

  return (
    <div>
      <h3>都道府県を選択</h3>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={`pref-${prefecture.prefCode}`}
            onChange={() => onSelect(prefecture.prefCode)}
          />
          <label htmlFor={`pref-${prefecture.prefCode}`}>
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PrefectureCheckbox;
