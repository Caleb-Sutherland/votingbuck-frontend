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
} from "recharts";

export default function DonationsOverPeriod(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Access the redux store
  const organizations: Record<number, IOrganization> = useSelector(
    (state: DataState) => state.organizations
  );

  const data = organizations[props.orgId].periods[localPeriod].donationsByMonth;

  const months: Record<number, string> = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const formattedData = data.map((item: IDonation): IDonation => {
    const date: Date = new Date(item.month_start_date);

    const month: string = months[date.getMonth()];
    const year: string = date.getFullYear().toString();

    return {
      month_start_date: year + ", " + month,
      amount_donated: item.amount_donated,
    };
  });

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center">
        <span>Donations Over Period</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month_start_date" tick={false} />
          <YAxis />
          <Tooltip
            formatter={(value: string, field: string, props: any) => {
              return [value, "Amount donated: "];
            }}
          />
          <Bar dataKey="amount_donated" fill="#34eba1"></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
