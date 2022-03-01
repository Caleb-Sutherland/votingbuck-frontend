import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addCorporationPeriod } from "../store/actions/corporationActionCreators";

import TopDonatorsGraph from "../components/corporation_charts/TopDonatorsGraph";
import DonationsOverPeriod from "../components/corporation_charts/DonationsOverPeriod";
import DonationsByParty from "../components/corporation_charts/DonationsByParty";
import TopRecipients from "../components/corporation_charts/TopRecipients";

export default function Corporation() {
  // Master period control
  const default_period = "2018-2020";
  const [current_period, setCurrentPeriod] = useState(default_period);
  const corp_id = 1; // Needs to be a prop passed to the page or taken from url

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  // Enter the periods data into the redux store
  dispatch(addCorporationPeriod(corp_id, current_period));

  // Access the redux store
  const corporations: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  if (
    corporations[corp_id] !== undefined &&
    corporations[corp_id].periods[current_period] !== undefined
  ) {
    return (
      <div>
        <div className="ml-16 mt-16 mb-8">
          <h1 className="text-3xl font-bold">{corporations[corp_id].name}</h1>
          <span>Corporation</span>
        </div>
        <div className="pl-14 pr-14 h-screen w-full overflow-auto">
          <div className="grid grid-cols-12 grid-rows-3 gap-x-1 gap-y-8 h-full">
            <div className="col-start-1 col-end-5 row-span-1">
              <TopDonatorsGraph corpId={corp_id} globalPeriod={current_period} />
            </div>
            <div className="col-start-5 col-end-9 row-span-1">
              <DonationsOverPeriod
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
            <div className="col-start-9 col-end-12 row-span-1">
              <DonationsByParty corpId={corp_id} globalPeriod={current_period} />
            </div>
            <div className="col-start-1 col-end-5 row-start-2 row-end-3">
              <TopRecipients corpId={corp_id} globalPeriod={current_period} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}