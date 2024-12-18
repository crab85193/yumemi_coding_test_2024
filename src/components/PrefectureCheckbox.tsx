import React from "react";
import { Prefecture } from "../types/prefecture";
import usePrefecturesStore from "../store/usePrefecturesStore";

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
    <div>
      <h3>都道府県を選択</h3>
      <button
        onClick={() => onSelectAll(prefectures.map((pref) => pref.prefCode))}
      >
        すべて選択
      </button>
      <button onClick={onClearSelection}>選択をクリア</button>
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
  );
};

export default PrefectureCheckbox;
