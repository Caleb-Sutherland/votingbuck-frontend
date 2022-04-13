import React from "react";
import TileSelectBox from "./TileSelectBox";
import { AiOutlineCheckCircle } from "react-icons/ai";
import RealDataTooltip from "./RealDataTooltip";

export default function TileTitle(props: any) {
  if (props.selectFunction && props.localPeriod) {
    return (
      <div className="w-full grid grid-cols-12 mb-6 h-6">
        <div className="col-start-1 col-end-8 text-base flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
          <span>{props.title}</span>
          {!props.fakeData ? <RealDataTooltip /> : null}
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
      <div className="col-start-1 col-end-13 text-base flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
        <span>{props.title}</span>
        {!props.fakeData ? <RealDataTooltip /> : null}
      </div>
      <div className="col-start-13 col-end-13 flex justify-end content-center items-center invisible">
        <TileSelectBox
          onChange={props.selectFunction}
          defaultValue={props.localPeriod}
        />
      </div>
    </div>
  );
}
