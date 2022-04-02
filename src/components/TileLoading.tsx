import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function TileLoading() {
  return (
    <div className="h-full flex justify-center content-center items-center justify-items-center">
      <FaSpinner size={50} className="animate-spin" />
    </div>
  );
}
