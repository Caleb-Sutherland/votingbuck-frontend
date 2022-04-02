import React from "react";
import { getPeriods } from "../helper/periods";
import Select from "react-select";

export default function TileSelectBox(props: any) {
  const periods = getPeriods();
  const changeFunction = props.onChange;
  const defaultValue = props.defaultValue;

  const options = periods
    .map((period) => {
      return { value: period, label: period };
    })
    .reverse();

  const customStyles = {
    control: (base: any) => ({
      ...base,
      height: "50%",
    }),
  };
  return (
    <Select
      className="text-xs lg:text-base"
      onChange={(e) => {
        if (e) {
          changeFunction(e.value);
        }
      }}
      defaultValue={{ value: defaultValue, label: defaultValue }}
      options={options}
      styles={customStyles}
    />
  );
}
