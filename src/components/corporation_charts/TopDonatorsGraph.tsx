import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function TopDonatorsGraph(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Access the redux store
  const corporation: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  // Data for feed the graph
  const data = corporation[props.corpId].periods[localPeriod].topDonators;

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center">
        <span>Top Donators</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="contributor" tick={false} />
          <YAxis />
          <Tooltip
            formatter={(value: string) => {
              return [value, "Amount donated:"];
            }}
          />
          <Bar dataKey="total_amount" fill="#34eba1">
            <LabelList
              dataKey="contributor"
              formatter={(name: string): string => {
                const names: string[] = name.split(" ");
                if (names.length > 1) {
                  return names[0][0] + ". " + names[1];
                } else {
                  return name;
                }
              }}
              angle={270}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
