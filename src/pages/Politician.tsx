import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addPoliticianPeriod } from "../store/actions/politicianActionCreators";

import TopDonators from "../components/politician_charts/TopDonators";
import DonationsRecievedOverPeriod from "../components/politician_charts/DonationsRecievedOverPeriod";

export default function Politician() {
  // Master period control
  const default_period = "2018-2020";
  const [current_period, setCurrentPeriod] = useState(default_period);
  const poli_id = 1; // Needs to be a prop passed to the page or taken from url

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  // Enter the periods data into the redux store
  dispatch(addPoliticianPeriod(poli_id, current_period));

  // Access the redux store
  const politicians: Record<number, IPolitician> = useSelector(
    (state: DataState) => state.politicians
  );

  if (
    politicians[poli_id] !== undefined &&
    politicians[poli_id].periods[current_period] !== undefined
  ) {
    return (
      <div>
        <div className="ml-16 mt-16 mb-8">
          <h1 className="text-3xl font-bold">{politicians[poli_id].name}</h1>
          <span>{politicians[poli_id].party}</span>
        </div>
        <div className="pl-14 pr-14 h-screen w-full overflow-auto">
          <div className="grid grid-cols-12 grid-rows-4 gap-1 h-full">
            <div className="col-start-1 col-end-5 row-span-1">
              <TopDonators poliId={poli_id} globalPeriod={current_period} />
            </div>
            <div className="col-start-5 col-end-9 row-span-1">
              <DonationsRecievedOverPeriod
                poliId={poli_id}
                globalPeriod={current_period}
              />
            </div>
            <div className="col-start-9 col-end-12 row-span-1"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
