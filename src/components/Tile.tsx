import React from "react";

export default function Tile(props: any) {
  const graph = props.graph;
  return (
    <div className="rounded-xl h-full w-2/6 w-2/6 bg-slate-100 p-2 flex content-center justify-center justify-items-center items-center">
      {graph}
    </div>
  );
}
