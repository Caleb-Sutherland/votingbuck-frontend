import React from "react";
import { getPeriods } from "../helper/periods";

export default function TileSelectBox(props: any) {
  const periods = getPeriods();
  const changeFunction = props.onChange;
  const defaultValue = props.defaultValue;

  return (
    <select
      onChange={(e) => {
        changeFunction(e.target.value);
      }}
      defaultValue={defaultValue}
      className="bg-selectBg border-solid border border-selectBorder rounded outline-none hover:border-selectBorderActive active:border-selectBorderActive"
    >
      {periods.map((period: string, index: number) => {
        return (
          <option key={index} value={period}>
            {period}
          </option>
        );
      })}
    </select>
  );
}
