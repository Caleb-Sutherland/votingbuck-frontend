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

export default function ContributionShareByParty(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Set up dispatch to be able to add local periods
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Check if we need to fetch a new period for this corporation
    if (
      localPeriod !== props.globalPeriod &&
      !(localPeriod in corporation[props.corpId].periods)
    ) {
      dispatch(addCorporationPeriod(props.corpId, localPeriod));
    }
  }, [localPeriod]);

  // Access the redux store
  const corporation: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  if (localPeriod in corporation[props.corpId].periods) {
    const data =
      corporation[props.corpId].periods[localPeriod].donationsByParty;

    const formattedData = data.map((item: ICorporateDonationToParty): any => {
      let fill_color;
      if (item.party === "democratic") {
        fill_color = graph_colors.democratic;
      } else if (item.party == "republican") {
        fill_color = graph_colors.republican;
      } else {
        fill_color = graph_colors.independent;
      }
      return { name: item.party, value: item.total_amount, fill: fill_color };
    });

    // Custom label positioning and content
    const renderCustomLabel = (entry: any) => {
      const RADIAN = Math.PI / 180;

      // Unpack data from the entry
      const vBox: any = entry.viewBox;
      const cx: any = entry.cx;
      const cy: any = entry.cy;

      // Calculate correct position for the label
      const midAngle = (vBox.startAngle + vBox.endAngle) / 2;
      const radius = vBox.outerRadius * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      let label;
      if (entry.name === "republican") {
        label = "R";
      } else if (entry.name === "democratic") {
        label = "D";
      } else {
        label = "I";
      }

      return (
        <text
          x={x}
          y={y}
          fill="white"
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
      if (data.name == "democratic") {
        fill = graph_colors.democratic;
      } else if (data.name == "republican") {
        fill = graph_colors.republican;
      } else {
        fill = graph_colors.independent;
      }
      return (
        <div
          className="bg-other p-4 text-white opacity-90 rounded-2xl"
          style={{ backgroundColor: fill }}
        >
          {format.capitalizeWord(data.name)} Party: $
          {format.formatNumber(data.value)}
        </div>
      );
    };

    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12">
          <span className="col-start-1 col-end-6 flex justify-center">
            Donations By Party ($)
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              periods={["2017-2018", "2019-2020", "2021-2022"]}
              defaultValue={localPeriod}
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={formattedData}
              cx={"50%"}
              cy={"47.5%"}
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
        <div className="w-full grid grid-cols-12">
          <span className="col-start-1 col-end-6 flex justify-center">
            Donations By Party ($)
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              periods={["2017-2018", "2019-2020", "2021-2022"]}
              defaultValue={localPeriod}
            />
          </div>
        </div>
      </div>
    );
  }
}
