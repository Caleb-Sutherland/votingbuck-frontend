import React from "react";
import TileSelectBox from "./TileSelectBox";

export default function TileTitle(props: any) {
  if (props.selectFunction && props.localPeriod) {
    return (
      <div className="w-full grid grid-cols-12 mb-6 h-6">
        <div className="col-start-1 col-end-8 text-regular flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
          <span>{props.title}</span>
        </div>
        <div className="col-start-9 col-end-13 flex justify-end content-center items-center">
          <TileSelectBox
            onChange={props.selectFunction}
            defaultValue={props.localPeriod}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-12 mb-6 h-6">
      <div className="col-start-1 col-end-13 text-regular flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
        <span>{props.title}</span>
      </div>
    </div>
  );
}
