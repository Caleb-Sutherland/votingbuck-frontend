import React from "react";
import { useSelector } from "react-redux";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import * as format from "../../helper/formatting";
import { Corporation } from "../../interfaces/corporation.interface";
import { DataState } from "../../interfaces/global.interface";
import TileTitle from "../TileTitle";

export default function TotalContributionsByDollar(props: any) {
  // Access the redux store
  const corporation: Record<number, Corporation> = useSelector(
    (state: DataState) => state.corporations
  );

  const data = corporation[props.corpId].totalContributionsDollar;

  // Iterate over donations and group then into intervals by month
  let start: Date = new Date(Date.parse(data[0].date));
  const end: Date = new Date(Date.parse(data[0].date));
  const month_group_number = 6;
  end.setMonth(end.getMonth() + month_group_number);

  let total_donations = 0;
  const smoothed_data = [];
  for (let i = 0; i < data.length; i++) {
    const current_date = new Date(Date.parse(data[i].date));
    if (current_date.getTime() <= end.getTime()) {
      // Date is within our current interval, so add its donations to the current total
      total_donations += data[i].dollars_donated;
    } else {
      // The interval has been passed, so add the current total donations, then start the next interval
      smoothed_data.push({
        date_range:
          start.toDateString().split(" ").slice(1).join(" ") +
          " - " +
          end.toDateString().split(" ").slice(1).join(" "),
        dollars_donated: total_donations,
      });
      start = new Date(end.getTime());
      start.setDate(start.getDate() + 1);
      end.setMonth(end.getMonth() + month_group_number);
      total_donations = data[i].dollars_donated;
    }
  }

  // Add the remaining group at the end of the intervals
  if (total_donations > 0) {
    const temp = new Date(Date.parse(data[data.length - 1].date));
    smoothed_data.push({
      date_range:
        start.toDateString().split(" ").slice(1).join(" ") +
        " - " +
        temp.toDateString().split(" ").slice(1).join(" "),
      dollars_donated: total_donations,
    });
  }

  // Custom tooltip style for each bar
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active) {
      return null;
    }
    const data = payload[0].payload;

    return (
      <div
        className="bg-other p-4 text-black opacity-90 rounded-2xl"
        style={{ backgroundColor: "#e6f7f4" }}
      >
        <div>
          <span>{data.date_range}</span>
        </div>
        <div>
          <span>Donated: ${format.formatNumber(data.dollars_donated)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      <TileTitle title="Total Donations ($)" fakeData />
      <ResponsiveContainer width="100%">
        <LineChart
          width={730}
          height={250}
          data={smoothed_data}
          margin={{ top: 5, right: 25, left: 25, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_range" ticks={[-1, 0, 1]} />
          <YAxis dataKey="dollars_donated" />
          <Tooltip content={CustomTooltip} />
          <Line
            type="monotone"
            dataKey="dollars_donated"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
