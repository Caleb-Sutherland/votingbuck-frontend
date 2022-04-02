import React, { Dispatch, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { graph_colors } from "../../constants/graph_colors";
import * as format from "../../helper/formatting";
import { DataState } from "../../interfaces/global.interface";
import {
  University,
  RegisteredVoters as IRegisteredVoters,
} from "../../interfaces/university.interface";
import { addUniversityPeriod } from "../../store/actions/universityActionCreators";
import TileLoading from "../TileLoading";
import TileTitle from "../TileTitle";

export default function RegisteredVoters(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Set up dispatch to be able to add local periods
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Check if we need to fetch a new period for this university
    if (
      localPeriod !== props.globalPeriod &&
      !(localPeriod in universities[props.uniId].periods)
    ) {
      dispatch(addUniversityPeriod(props.uniId, localPeriod));
    }
  }, [localPeriod]);

  // Access the redux store
  const universities: Record<number, University> = useSelector(
    (state: DataState) => state.universities
  );

  if (
    localPeriod in universities[props.uniId].periods &&
    universities[props.uniId].periods[localPeriod].registeredVoters.length > 0
  ) {
    const data: IRegisteredVoters[] =
      universities[props.uniId].periods[localPeriod].registeredVoters;

    const formattedData: { name: string; value: number; fill: string }[] = [];
    for (const key in data[0]) {
      if (key === "republican") {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.republican,
        });
      } else if (key === "democratic") {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.democratic,
        });
      } else {
        formattedData.push({
          name: key,
          value: data[0][key],
          fill: graph_colors.independent,
        });
      }
    }

    // Custom label positioning and content
    const renderCustomLabel = (entry: any) => {
      const RADIAN = Math.PI / 180;

      // Unpack data from the entry
      const vBox: any = entry.viewBox;
      const cx: any = entry.cx;
      const cy: any = entry.cy;

      // Calculate correct position for the label
      const midAngle = (vBox.startAngle + vBox.endAngle) / 2;
      const radius = vBox.outerRadius * 0.825;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      let label;
      let text_color;
      if (entry.name === "republican") {
        text_color = " white";
        label = "R";
      } else if (entry.name === "democratic") {
        text_color = " white";
        label = "D";
      } else {
        text_color = " white";
        label = "O";
      }

      return (
        <text
          x={x}
          y={y}
          fill={text_color}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-md lg:text-xl"
        >
          {label}
        </text>
      );
    };

    // Custom tooltip style for each bar
    const CustomTooltip = ({ active, payload }: any) => {
      if (!active) {
        return null;
      }
      const data = payload[0].payload;

      let fill;
      let text_color;
      if (data.name == "democratic") {
        fill = graph_colors.democratic;
        text_color = " text-white";
      } else if (data.name == "republican") {
        fill = graph_colors.republican;
        text_color = " text-white";
      } else {
        fill = graph_colors.independent;
        text_color = " text-black";
      }

      return (
        <div
          className={"bg-other p-4 opacity-90 rounded-2xl" + text_color}
          style={{ backgroundColor: fill }}
        >
          <div>
            {data.name !== "independent"
              ? format.capitalizeWord(data.name) + " Party"
              : "Other Parties"}
            : {data.value} Voters
          </div>
        </div>
      );
    };

    return (
      <div className="h-full w-full pb-4">
        <TileTitle
          title="Registered Voters"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={formattedData}
              cx={"50%"}
              cy={"47.5%"}
              innerRadius={"60%"}
              outerRadius={"90%"}
            >
              <LabelList content={renderCustomLabel} />
            </Pie>

            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full">
        <TileTitle
          title="Registered Voters"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
        <div className="h-full flex content-center justify-center items-center">
          {localPeriod in universities[props.uniId].periods ? (
            <div>No data for this period...</div>
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
