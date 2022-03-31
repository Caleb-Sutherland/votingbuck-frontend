import React from "react";
import TileSelectBox from "./TileSelectBox";

export default function TileTitle(props: any) {
  return (
    <div className="w-full grid grid-cols-12 mb-6 h-6">
      <div className="col-start-1 col-end-8 flex justify-start content-center items-center text-lg font-semibold text-gray-600 truncate">
        <span>{props.title}</span>
      </div>
      <div className="col-start-8 col-end-13 flex justify-end content-center items-center">
        {props.selectFunction && props.localPeriod ? (
          <TileSelectBox
            onChange={props.selectFunction}
            defaultValue={props.localPeriod}
          />
        ) : null}
      </div>
    </div>
  );
}
