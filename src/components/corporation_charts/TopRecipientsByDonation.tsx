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
import { graph_colors } from "../../constants/graph_colors";
import TileSelectBox from "../TileSelectBox";
import { addCorporationPeriod } from "../../store/actions/corporationActionCreators";
import TileLoading from "../TileLoading";
import {
  Corporation,
  TopRecipientDonation,
} from "../../interfaces/corporation.interface";
import { DataState } from "../../interfaces/global.interface";
import TileTitle from "../TileTitle";

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
  const corporation: Record<number, Corporation> = useSelector(
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

    const data = payload[0].payload;

    let fill;
    let text_color;
    if (data.party == "democratic") {
      fill = graph_colors.democratic;
      text_color = " text-white";
    } else if (data.party == "republican") {
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
        Donations Received: {data.donations_received}
      </div>
    );
  };

  // Ensure that this periods data has been successfully loaded into the redux store
  if (
    localPeriod in corporation[props.corpId].periods &&
    corporation[props.corpId].periods[localPeriod].topRecipientsDonation
      .length > 0
  ) {
    // Data to feed the graph
    const data = corporation[props.corpId].periods[
      localPeriod
    ].topRecipientsDonation.sort(
      (a: TopRecipientDonation, b: TopRecipientDonation): number => {
        if (a.donations_received < b.donations_received) {
          return 1;
        }
        if (a.donations_received > b.donations_received) {
          return -1;
        }
        return 0;
      }
    );

    return (
      <div className="h-full w-full">
        <TileTitle title="Top Recipients (# of Donations)" selectFunction={setLocalPeriod} localPeriod={localPeriod}/>
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
    return (
      <div className="h-full w-full">
        <TileTitle title="Top Recipients (# of Donations)" selectFunction={setLocalPeriod} localPeriod={localPeriod}/>
        <div className="h-full flex content-center justify-center items-center">
          {localPeriod in corporation[props.corpId].periods ? (
            <div>No data for this period...</div>
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
