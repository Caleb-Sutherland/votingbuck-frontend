import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";
import * as format from "../../helper/formatting";

export default function TotalContributionsByDollar(props: any) {
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

  // Ensure that this periods data has been successfully loaded into the redux store
  if (localPeriod in corporation[props.corpId].periods) {
    const data = corporation[props.corpId].periods[
      localPeriod
    ].totalContributionsDollar.sort(
      (
        a: ICorporateTotalContributionsDollar,
        b: ICorporateTotalContributionsDollar
      ) => {
        const d1 = Date.parse(a.date);
        const d2 = Date.parse(b.date);

        if (d1 > d2) {
          return 1;
        }
        if (d1 < d2) {
          return -1;
        }
        return 0;
      }
    );

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
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Total Donations ($)
          </span>
        </div>
        <ResponsiveContainer width="100%">
          <LineChart
            width={730}
            height={250}
            data={smoothed_data}
            margin={{ top: 5, right: 25, left: 25, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ideology" ticks={[-1, 0, 1]} />
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
  } else {
    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Total Donations ($)
          </span>
        </div>
      </div>
    );
  }
}
