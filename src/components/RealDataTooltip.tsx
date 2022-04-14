import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import ReactTooltip from "react-tooltip";

export default function RealDataTooltip() {
  return (
    <div>
      <AiOutlineCheckCircle
        className="text-green-600 ml-1 mt-1"
        data-for="real-data-tip"
        data-tip="Real Data"
        data-iscapture="true"
      />

      <ReactTooltip id="real-data-tip" />
    </div>
  );
}
