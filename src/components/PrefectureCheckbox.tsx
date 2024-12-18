import React from "react";
import { Prefecture } from "../types/prefecture";
import usePrefecturesStore from "../store/usePrefecturesStore";
import "../assets/styles/PrefectureCheckbox.css";

interface PrefectureCheckboxProps {
  prefectures: Prefecture[];
  onSelect: (prefCode: number) => void;
  onSelectAll: (prefCodes: number[]) => void;
  onClearSelection: () => void;
}

const PrefectureCheckbox: React.FC<PrefectureCheckboxProps> = ({
  prefectures,
  onSelect,
  onSelectAll,
  onClearSelection,
}) => {
  const { selectedPrefectures } = usePrefecturesStore();

  return (
    <div className="prefecture-checkbox prefecture-checkbox__wrapper">
      <h2 className="subtitle">都道府県選択</h2>
      <div className="button-area">
        <button
          onClick={() => onSelectAll(prefectures.map((pref) => pref.prefCode))}
        >
          すべて選択
        </button>
        <button onClick={onClearSelection}>選択をクリア</button>
      </div>
      <div className="checkbox-area">
        {prefectures.map((pref) => (
          <div key={pref.prefCode}>
            <input
              id={`pref-${pref.prefCode}`}
              type="checkbox"
              checked={selectedPrefectures.includes(pref.prefCode)}
              onChange={() => onSelect(pref.prefCode)}
            />
            <label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefectureCheckbox;
