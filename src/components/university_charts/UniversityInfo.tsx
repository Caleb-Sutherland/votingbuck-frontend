import React, { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../images/Apple.svg";

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
import { addUniversityPeriod } from "../../store/actions/universityActionCreators";
import TileSelectBox from "../TileSelectBox";
import { IoSchoolSharp } from "react-icons/io5";

export default function UniversityInfo(props: any) {
  return (
    <div className="lg:pt-8 pl-8 pr-8">
      <div className="flex">
        <IoSchoolSharp size={60} className="mr-3"/>
        <div className="mb-0.5">
          <div className="text-4xl font-bold mb-0.5">
            Harvard University (HU)
          </div>
          <div className="text-lightGrayText">Private, Founded in 1636</div>
        </div>
      </div>
      <div className="mb-2 mt-2">
        <span>Massachusetts Hall Cambridge 02138 Massachusetts Road</span>
      </div>
      <div className="mb-2">
        <a href="https://www.harvard.edu">https://www.harvard.edu</a>
      </div>
      <div>40-45k Students, 2-2.5k Staff</div>
    </div>
  );
}
