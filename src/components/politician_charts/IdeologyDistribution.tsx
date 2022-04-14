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
  ReferenceLine,
  Label,
} from "recharts";
import { addPoliticianPeriod } from "../../store/actions/politicianActionCreators";
import TileLoading from "../TileLoading";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";
import TileTitle from "../TileTitle";

export default function IdeologyDistribution(props: any) {
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
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  // Ensure that this periods data has been successfully loaded into the redux store
  if (
    localPeriod in politicians[props.poliId].periods &&
    politicians[props.poliId].periods[localPeriod].ideologyDistribution.length >
      0
  ) {
    // Data to feed the graph
    const data =
      politicians[props.poliId].periods[localPeriod].ideologyDistribution;

    // Pass through data and convert to a dictionary so that we can quickly see what ideology scores are missing
    const ideologyToValue: any = {};
    for (let i = 0; i < data.length; i++) {
      ideologyToValue[data[i].ideology.toFixed(2)] = data[i].count;
    }

    // Fill in any missing ideology scores
    const formattedData = [];
    for (let i = -1; i <= 1.01; i += 0.01) {
      const key = i.toFixed(2);
      if (!(key in ideologyToValue)) {
        formattedData.push({ ideology: key, count: 0 });
      } else {
        formattedData.push({
          ideology: key,
          count: ideologyToValue[key],
        });
      }
    }

    // Pass through all scores and group them together to smooth out the data
    const smoothed_data = [];
    const group_size = 21; // Must be odd number
    let mid_ideology;
    let amount;
    for (let i = 0; i <= formattedData.length - group_size; i++) {
      // Get the group
      const group = [];
      for (let j = i; j < i + group_size; j++) {
        group.push(formattedData[j]);
      }

      // Calculate the midpoint and average amount
      mid_ideology = group[(group_size - 1) / 2].ideology;
      const getTotalCount = (arr: any) => {
        let sum = 0;
        for (let k = 0; k < arr.length; k++) {
          sum += arr[k].count;
        }
        return sum;
      };
      amount = getTotalCount(group);

      smoothed_data.push({
        ideology: mid_ideology,
        count: amount,
      });
    }

    // Custom tooltip style for each bar
    const CustomTooltip = ({ active, payload }: any) => {
      if (!active) {
        return null;
      }
      const data = payload[0].payload;

      return (
        <div className="bg-tooltipBack p-4 text-black opacity-90 rounded-2xl">
          <div>
            <span>Ideology: {data.ideology}</span>
          </div>
          <div>
            <span>Politicians: {data.count}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="h-full w-full">
        <TileTitle
          title="Ideology Distribution"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
        <ResponsiveContainer width="100%">
          <LineChart
            width={730}
            height={250}
            data={smoothed_data}
            margin={{ top: 5, right: 25, left: 5, bottom: 30 }}
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
            <YAxis dataKey="count" />
            <Tooltip content={CustomTooltip} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              dot={false}
            />
            <ReferenceLine
              isFront
              x={politicians[props.poliId].ideology}
              stroke="purple"
              ifOverflow="extendDomain"
              strokeWidth={2}
            >
              <Label
                position={
                  parseFloat(politicians[props.poliId].ideology) > 0
                    ? "insideTopRight"
                    : "insideTopLeft"
                }
                value={politicians[props.poliId].name}
              />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full">
        <TileTitle
          title="Ideology Distribution"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
        />
        <div className="h-full flex content-center justify-center items-center">
          {localPeriod in politicians[props.poliId].periods ? (
            <div>No data for this period...</div>
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
