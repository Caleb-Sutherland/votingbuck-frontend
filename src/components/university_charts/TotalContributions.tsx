import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
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
  Legend,
  LineChart,
  Line,
} from "recharts";
import { graph_colors } from "../../constants/graph_colors";
import TileSelectBox from "../TileSelectBox";
import { addUniversityPeriod } from "../../store/actions/universityActionCreators";
import * as format from "../../helper/formatting";
import { DataState } from "../../interfaces/global.interface";
import { University, TotalContributionsDollar } from "../../interfaces/university.interface";

export default function TotalContributions(props: any) {
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

  // Ensure that this periods data has been successfully loaded into the redux store
  if (localPeriod in universities[props.uniId].periods) {
    const data = universities[props.uniId].periods[
      localPeriod
    ].totalContributionsDollar.sort(
      (a: TotalContributionsDollar, b: TotalContributionsDollar) => {
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

    // Iterate over donations and group then into intervals of 3 months
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
        total_donations += 1;
      } else {
        // The interval has been passed, so add the current total donations, then start the next interval
        smoothed_data.push({
          date_range:
            start.toDateString().split(" ").slice(1).join(" ") +
            " - " +
            end.toDateString().split(" ").slice(1).join(" "),
          number_of_donations: total_donations,
        });
        start = new Date(end.getTime());
        start.setDate(start.getDate() + 1);
        end.setMonth(end.getMonth() + month_group_number);
        total_donations = 1;
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
        number_of_donations: total_donations,
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
            <span>Number of donations: {data.number_of_donations}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Total Donations (# of Donations)
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
            <YAxis dataKey="number_of_donations" />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="number_of_donations"
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
          <span className="col-start-1 col-end-6 flex justify-center">
            Total Donations (# of Donations)
          </span>
        </div>
      </div>
    );
  }
}
