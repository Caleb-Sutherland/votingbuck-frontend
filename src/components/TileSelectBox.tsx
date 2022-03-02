import React from "react";

export default function TileSelectBox(props: any) {
  const periods = props.periods;
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
      {periods.map((period: string, index:number) => {
        return <option key={index} value={period}>{period}</option>;
      })}
    </select>
  );
}
