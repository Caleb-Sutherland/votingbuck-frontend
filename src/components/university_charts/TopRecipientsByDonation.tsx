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
import { addUniversityPeriod } from "../../store/actions/universityActionCreators";
import TileLoading from "../TileLoading";

export default function TopRecipientsByDonation(props: any) {
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
  const universities: Record<number, IUniversity> = useSelector(
    (state: DataState) => state.universities
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
    localPeriod in universities[props.uniId].periods &&
    universities[props.uniId].periods[localPeriod].topRecipientsDonation
      .length > 0
  ) {
    // Data to feed the graph
    const data = universities[props.uniId].periods[
      localPeriod
    ].topRecipientsDonation.sort(
      (
        a: ICorporateTopRecipientDonation,
        b: ICorporateTopRecipientDonation
      ): number => {
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
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Top Recipients (# of Donations)
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
        <div className="w-full grid grid-cols-12 mb-3">
          <span className="col-start-1 col-end-8 flex justify-start">
            Top Recipients (# of Donations)
          </span>
          <div className="col-start-10 col-end-13 flex justify-center">
            <TileSelectBox
              onChange={setLocalPeriod}
              defaultValue={localPeriod}
            />
          </div>
        </div>
        <div>
          {localPeriod in universities[props.uniId].periods ? (
            "No data for this period..."
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
