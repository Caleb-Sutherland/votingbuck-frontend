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
import TileLoading from "../TileLoading";
import { Corporation } from "../../interfaces/corporation.interface";
import { DataState } from "../../interfaces/global.interface";
import TileTitle from "../TileTitle";

export default function ImputedIdeology(props: any) {
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

  // Ensure that this periods data has been successfully loaded into the redux store
  if (
    localPeriod in corporation[props.corpId].periods &&
    corporation[props.corpId].periods[localPeriod].ideologyDistribution.length >
      0
  ) {
    // Data to feed the graph
    const data =
      corporation[props.corpId].periods[localPeriod].ideologyDistribution;

    // Pass through data and convert to a dictionary so that we can quickly see what ideology scores are missing
    const ideologyToValue: any = {};
    for (let i = 0; i < data.length; i++) {
      ideologyToValue[data[i].ideology.toFixed(2)] = data[i].dollars_donated;
    }

    // Fill in any missing ideology scores
    const formattedData = [];
    for (let i = -1; i <= 1.01; i += 0.01) {
      const key = i.toFixed(2);
      if (!(key in ideologyToValue)) {
        formattedData.push({ ideology: key, dollars_donated: 0 });
      } else {
        formattedData.push({
          ideology: key,
          dollars_donated: ideologyToValue[key],
        });
      }
    }

    // Pass through all scores and group them together to smooth out the data
    const smoothed_data = [];
    const group_size = 21; // Must be odd number
    let mid_ideology;
    let average_amount;
    for (let i = 0; i <= formattedData.length - group_size; i++) {
      // Get the group
      const group = [];
      for (let j = i; j < i + group_size; j++) {
        group.push(formattedData[j]);
      }

      // Calculate the midpoint and average amount
      mid_ideology = group[(group_size - 1) / 2].ideology;
      const getAverage = (arr: any) => {
        let sum = 0;
        for (let k = 0; k < arr.length; k++) {
          sum += arr[k].dollars_donated;
        }
        return sum / arr.length;
      };
      average_amount = getAverage(group);

      smoothed_data.push({
        ideology: mid_ideology,
        dollars_donated: average_amount,
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
            <span>Ideology: {data.ideology}</span>
          </div>
          <div>
            <span>
              Weighted Value: {format.formatNumber(data.dollars_donated)}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div className="h-full w-full">
        <TileTitle
          title="Imputed Ideology"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
        <ResponsiveContainer width="100%">
          <LineChart
            width={730}
            height={250}
            data={smoothed_data}
            margin={{ top: 5, right: 25, left: 25, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ideology"
              type="number"
              ticks={[
                parseFloat(smoothed_data[0].ideology),
                0,
                parseFloat(smoothed_data[smoothed_data.length - 1].ideology),
              ]}
            />
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
        <TileTitle
          title="Imputed Ideology"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
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
