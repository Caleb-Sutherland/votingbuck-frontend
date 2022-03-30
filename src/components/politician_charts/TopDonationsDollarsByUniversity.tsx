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
  Rectangle,
} from "recharts";
import TileSelectBox from "../TileSelectBox";
import { addPoliticianPeriod } from "../../store/actions/politicianActionCreators";
import * as format from "../../helper/formatting";
import { extra_colors } from "../../constants/graph_colors";
import TileLoading from "../TileLoading";

export default function TopDonationsDollarsByUniversity(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Set up dispatch to be able to add local periods
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Check if we need to fetch a new period for this politician
    if (
      localPeriod !== props.globalPeriod &&
      !(localPeriod in politicians[props.poliId].periods)
    ) {
      dispatch(addPoliticianPeriod(props.poliId, localPeriod));
    }
  }, [localPeriod]);

  // Access the redux store
  const politicians: Record<number, IPolitician> = useSelector(
    (state: DataState) => state.politicians
  );

  // Ensure that this periods data has been successfully loaded into the redux store
  if (
    localPeriod in politicians[props.poliId].periods &&
    politicians[props.poliId].periods[localPeriod]
      .topDonationsDollarsByUniversity.length > 0
  ) {
    // Data to feed the graph
    const data = politicians[props.poliId].periods[
      localPeriod
    ].topDonationsDollarsByUniversity.sort(
      (
        a: IPoliticianUniversityDonation,
        b: IPoliticianUniversityDonation
      ): number => {
        if (a.dollars_donated < b.dollars_donated) {
          return 1;
        }
        if (a.dollars_donated > b.dollars_donated) {
          return -1;
        }
        return 0;
      }
    );

    // Custom bar style for the graph
    const CustomBar = (props: any) => {
      const color_index = props.index % extra_colors.length;
      return <Rectangle {...props} fill={extra_colors[color_index]} />;
    };

    // Custom tooltip style for each bar
    const CustomTooltip = ({ active, payload }: any) => {
      if (!active) {
        return null;
      }
      const data = payload[0].payload;
      return (
        <div className={"bg-tooltipBack p-4 opacity-90 rounded-2xl"}>
          Received: ${format.formatNumber(data.dollars_donated)}
        </div>
      );
    };

    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Top University Receipts
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              defaultValue={localPeriod}
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={0}
            barSize={40}
            margin={{ top: 0, right: 25, left: 25, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" hide />
            <YAxis type="category" width={150} dataKey="university" />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="dollars_donated" shape={CustomBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Top University Receipts
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              defaultValue={localPeriod}
            />
          </div>
        </div>
        <div>
          {localPeriod in politicians[props.poliId].periods ? (
            "No data for this period..."
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
