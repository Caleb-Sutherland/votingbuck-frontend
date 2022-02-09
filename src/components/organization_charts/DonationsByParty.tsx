import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addOrganizationPeriod } from "../../store/actions/organizationActionCreators";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";

export default function DonationsByParty(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Access the redux store
  const organizations: Record<number, IOrganization> = useSelector(
    (state: DataState) => state.organizations
  );

  const data = organizations[props.orgId].periods[localPeriod].donationsByParty;

  const formattedData = data.map((item: IPartyDonation): any => {
    return { name: item.party, value: item.total_amount };
  });

  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center">
        <span>Donations By Party</span>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={formattedData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
