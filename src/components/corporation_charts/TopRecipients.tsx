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
  Rectangle,
} from "recharts";
import { graph_colors } from "../../graph_colors";

export default function TopRecipients(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Access the redux store
  const corporation: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  // Data for feed the graph
  const data = corporation[props.corpId].periods[
    localPeriod
  ].topRecipients.sort((a: ITopRecipient, b: ITopRecipient): number => {
    if (a.dollars_received < b.dollars_received) {
      return 1;
    }
    if (a.dollars_received > b.dollars_received) {
      return -1;
    }
    return 0;
  });

  // Custom bar style for the graph
  const CustomBar = (props: any) => {
    let fill;
    if (props.party == "democratic") {
      fill = graph_colors.democratic;
    } else if (props.party == "republican") {
      fill = graph_colors.republican;
    } else {
      fill = graph_colors.other;
    }

    //use explicit fill here, or use the additional css class and make a css selector to update fill there
    return <Rectangle {...props} fill={fill} />;
  };

  return (
    <div className="h-full w-full">
      <div className="w-full grid grid-cols-3 mb-3">
        <span className="col-start-2 col-end-3 flex justify-center">Top Recipients ($)</span>
        <div className="col-start-3 col-end-3 flex justify-center">
          <select
            onChange={(e) => {
              console.log(e);
            }}
          >
            <option>2018-2020</option>
            <option selected={true}>2020-2022</option>
            <option>2020-2022</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          layout="vertical"
          barCategoryGap={1}
          margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" hide />
          <YAxis type="category" width={150} dataKey="name" />
          <Tooltip
            formatter={(value: string) => {
              return [value, "Amount donated"];
            }}
          />
          <Bar dataKey="dollars_received" shape={CustomBar} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
