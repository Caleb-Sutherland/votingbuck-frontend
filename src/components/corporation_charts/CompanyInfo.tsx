import React, { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../images/Apple.svg";
import { IoIosBusiness } from "react-icons/io";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import { graph_colors } from "../../constants/graph_colors";
import * as format from "../../helper/formatting";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";
import TileSelectBox from "../TileSelectBox";

export default function CompanyInfo(props: any) {
  const temp =
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple  is the largest information technology company by revenue (totaling US$365.8 billion in 2021) and, as of January 2021, it is the world's most valuable company...";
  return (
    <div className="lg:pt-8 pl-8 pr-8">
      <div className="flex">
        <IoIosBusiness size={65} className="mr-2"/>
        <div className="mb-0.5">
          <div className="text-4xl font-bold mb-0.5">Apple</div>
          <div className="text-lightGrayText">Tech - Cupertino, California</div>
        </div>
      </div>

      <div className="flex space-x-4 mb-2">
        <div>
          <span className="font-bold text-md">2,748</span><span> Revolvers</span>
        </div>
        <div><span className="font-bold text-md">$1.7Bln</span><span> Lobbying Expenditure</span></div>
      </div>
      <div className="mb-2">{temp}</div>
      <div>Website</div>
    </div>
  );
}
