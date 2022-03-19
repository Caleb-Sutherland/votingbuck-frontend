import React, { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { graph_colors } from "../../graph_colors";
import * as format from "../../helper/formatting";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";
import TileSelectBox from "../TileSelectBox";

export default function CompanyInfo(props: any) {
  const temp =
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple  is the largest information technology company by revenue (totaling US$365.8 billion in 2021) and, as of January 2021, it is the world's most valuable company...";
  return (
    <div className="lg:pt-8 pl-8 pr-8">
      <div className="text-4xl font-bold">Apple</div>
      <div className="text-lightGrayText">Tech - Cupertino, California</div>
      <div className="flex space-x-4">
        <div><span className="font-bold text-md">2,748</span> Revolvers</div>
        <div>$1.7 Bln Lobbying Expenditure</div>
      </div>
      <div>{temp}</div>
      <div>Website</div>
    </div>
  );
}
