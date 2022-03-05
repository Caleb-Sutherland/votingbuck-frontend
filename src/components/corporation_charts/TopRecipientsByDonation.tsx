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
} from "recharts";
import { graph_colors } from "../../graph_colors";
import TileSelectBox from "../TileSelectBox";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";

export default function TopRecipientsByDonation(props: any) {
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

  // Custom bar style for the graph
  const CustomBar = (props: any) => {
    let fill;
    if (props.party == "democratic") {
      fill = graph_colors.democratic;
    } else if (props.party == "republican") {
      fill = graph_colors.republican;
    } else {
      fill = graph_colors.independent;
    }

    //use explicit fill here, or use the additional css class and make a css selector to update fill there
    return <Rectangle {...props} fill={fill} />;
  };

  // Custom tooltip style for each bar
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active) {
      return null;
    }
    console.log(payload);
    const data = payload[0].payload;
    console.log(data);
    let fill;
    if (data.party == "democratic") {
      fill = graph_colors.democratic;
    } else if (data.party == "republican") {
      fill = graph_colors.republican;
    } else {
      fill = graph_colors.independent;
    }
    return <div className="bg-other p-4 text-white opacity-90 rounded-2xl" style={{backgroundColor: fill}}>Dollars Received: {data.donations_received}</div>;
  };

  // Ensure that this periods data has been successfully loaded into the redux store
  if (localPeriod in corporation[props.corpId].periods) {
    // Data to feed the graph
    const data = corporation[props.corpId].periods[
      localPeriod
    ].topRecipientsDonation.sort((a: ITopRecipientDonation, b: ITopRecipientDonation): number => {
      if (a.donations_received < b.donations_received) {
        return 1;
      }
      if (a.donations_received > b.donations_received) {
        return -1;
      }
      return 0;
    });

    return (
      <div className="h-full w-full">
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-6 flex justify-center">
            Top Recipients (# of Donations)
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              periods={["2017-2018", "2019-2020", "2021-2022"]}
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
            <YAxis type="category" width={150} dataKey="name" />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="donations_received" shape={CustomBar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return <div>Loading... (Data for this period may not exist!)</div>;
  }
}
