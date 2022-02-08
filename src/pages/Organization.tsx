import React, { useState } from "react";
import { data as tempData } from "../components/TempData";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addOrganizationPeriod } from "../store/actions/organizationActionCreators";

import TopDonatorsGraph from "../components/organization_charts/TopDonatorsGraph";
import DonationsOverPeriod from "../components/organization_charts/DonationsOverPeriod";

// Define an interface for the data that we expect to read in
interface test {
  orgInfo: {
    id: number;
    name: string;
    industry: string;
  };
  donationsByMonth: {
    month_start_date: string;
    amount_donated: number;
  }[];
  topDonators: {
    contributor: string;
    total_amount: number;
  }[];
}

export default function Organization() {
  // Master period control
  const default_period = "2018-2020";
  const [current_period, setCurrentPeriod] = useState(default_period);
  const org_id = 1; // Needs to be a prop passed to the page or taken from url

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  // Enter the periods data into the redux store
  dispatch(addOrganizationPeriod(org_id, current_period));

  // Access the redux store
  const organizations: Record<number, IOrganization> = useSelector(
    (state: DataState) => state.organizations
  );

  if (
    organizations[org_id] !== undefined &&
    organizations[org_id].periods[current_period] !== undefined
  ) {
    return (
      <div>
        <div className="ml-16 mt-16 mb-8">
          <h1 className="text-3xl font-bold">Random Organization</h1>
          <span>Corporation</span>
        </div>
        <div className="pl-14 pr-14 h-screen w-full overflow-auto">
          <div className="grid grid-cols-12 grid-rows-4 gap-1 h-full">
            <div className="col-start-1 col-end-5 row-span-1"><TopDonatorsGraph orgId={org_id} globalPeriod={current_period}/></div>
            <div className="col-start-5 col-end-9 row-span-1"><DonationsOverPeriod orgId={org_id} globalPeriod={current_period}/></div>
            
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
