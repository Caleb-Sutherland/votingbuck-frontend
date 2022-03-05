import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addCorporationPeriod } from "../store/actions/corporationActionCreators";

import TopDonatorsGraph from "../components/corporation_charts/TopDonatorsGraph";
import DonationsOverPeriod from "../components/corporation_charts/DonationsOverPeriod";
import TopRecipientsByDollar from "../components/corporation_charts/TopRecipientsByDollar";
import TopRecipientsByDonation from "../components/corporation_charts/TopRecipientsByDonation";
import ContributionShareByParty from "../components/corporation_charts/ContributionShareByParty";

export default function Corporation() {
  // Master period control
  const default_period = "2019-2020";
  const [current_period, setCurrentPeriod] = useState(default_period);
  const corp_id = 1; // Needs to be a prop passed to the page or taken from url

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addCorporationPeriod(corp_id, current_period));
  }, [dispatch]);

  // Access the redux store
  const corporations: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  if (
    corporations[corp_id] !== undefined &&
    corporations[corp_id].periods[current_period] !== undefined
  ) {
    const tailwindTileStyles = "pl-3 pr-3 pt-2 pb-2 mb-4 flex justify-content-center content-center rounded overflow-hidden shadow-md lg:mb-0 lg:pt-2 lg:pb-2 " + " ";
    return (
      <div>
        <div className="flex flex-col justify-content-center content-center lg:ml-16 lg:mt-16 mb-8">
          <h1 className="text-3xl mt-8 font-bold text-center lg:text-left lg:mt-0">
            {corporations[corp_id].name}
          </h1>
          <span className="text-center lg:text-left">Corporation</span>
        </div>
        <div className="flex flex-col w-full lg:overflow-auto lg:pl-14 lg:pr-14 lg:h-screen lg:grid lg:grid-cols-12 lg:grid-rows-3 lg:gap-x-12 lg:gap-y-16 lg:mb-16">
          <div className={tailwindTileStyles + "col-start-1 col-end-5 row-start-1 lg:col-start-1 lg:col-end-5 lg:row-start-1"}>
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9 lg:row-start-1"}>
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13 lg:row-start-1"}>
            <ContributionShareByParty
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5 lg:row-start-2"}>
            <TopRecipientsByDonation
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9 lg:row-start-2"}>
            <TopRecipientsByDonation
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13 lg:row-start-2"}>
            <TopRecipientsByDonation
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5 lg:row-start-3"}>
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9 lg:row-start-3"}>
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13 lg:row-start-3"}>
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
