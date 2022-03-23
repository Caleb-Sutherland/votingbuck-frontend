import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addCorporationPeriod } from "../store/actions/corporationActionCreators";

import TopRecipientsByDollar from "../components/corporation_charts/TopRecipientsByDollar";
import TopRecipientsByDonation from "../components/corporation_charts/TopRecipientsByDonation";
import ContributionShareByParty from "../components/corporation_charts/ContributionShareByParty";
import ImputedIdeology from "../components/corporation_charts/ImputedIdeology";
import TotalContributionsByDollar from "../components/corporation_charts/TotalContributionsByDollar";
import TotalContributions from "../components/corporation_charts/TotalContributions";
import CompanyInfo from "../components/corporation_charts/CompanyInfo";
import RegisteredVoters from "../components/corporation_charts/RegisteredVoters";

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
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-2 mb-4 flex justify-content-center content-center rounded overflow-hidden shadow-lg lg:mb-0 lg:pt-2 lg:pb-2 " +
      " ";
    return (
      <div>
        <div className="flex flex-col w-full lg:overflow-auto lg:h-screen lg:pl-14 lg:pr-14 lg:grid lg:grid-cols-12 lg:grid-rows-3 lg:gap-x-8 lg:gap-y-8 lg:mb-16 lg:mt-8">
          <div
            className={
              tailwindTileStyles +
              "lg:col-start-1 lg:col-end-7 lg:row-start-1"
            }
          >
            <CompanyInfo corpId={corp_id} globalPeriod={current_period} name={corporations[corp_id].name} industry={"Corporation"} />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-7 lg:col-end-10 lg:row-start-1"
            }
          >
            <RegisteredVoters
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-10 lg:col-end-13 lg:row-start-1"
            }
          >
            <ContributionShareByParty
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-1 lg:col-end-5 lg:row-start-2"
            }
          >
            <ImputedIdeology corpId={corp_id} globalPeriod={current_period} />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-5 lg:col-end-9 lg:row-start-2"
            }
          >
            <TotalContributionsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-9 lg:col-end-13 lg:row-start-2"
            }
          >
            <TotalContributions
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-1 lg:col-end-5 lg:row-start-3"
            }
          >
            <TopRecipientsByDollar
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-5 lg:col-end-9 lg:row-start-3"
            }
          >
            <TopRecipientsByDonation
              corpId={corp_id}
              globalPeriod={current_period}
            />
          </div>
          <div
            className={
              tailwindTileStyles + "lg:col-start-9 lg:col-end-13 lg:row-start-3"
            }
          >
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
