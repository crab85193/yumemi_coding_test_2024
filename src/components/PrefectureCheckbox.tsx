import React from "react";
import { Prefecture } from "../types/prefecture";
import usePrefecturesStore from "../store/prefecturesStore";

const PrefectureCheckbox: React.FC<{ prefectures: Prefecture[] }> = ({
  prefectures,
}) => {
  const { selectedPrefectures, togglePrefecture, selectAll, clearSelection } =
    usePrefecturesStore();

  return (
    <div>
      <h3>都道府県選択</h3>
      <button
        onClick={() => selectAll(prefectures.map((pref) => pref.prefCode))}
      >
        すべて選択
      </button>
      <button onClick={clearSelection}>選択をクリア</button>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode}>
          <input
            type="checkbox"
            id={prefecture.prefCode.toString()}
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            onChange={() => togglePrefecture(prefecture.prefCode)}
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
