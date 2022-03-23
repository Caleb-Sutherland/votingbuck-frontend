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
    const tailwindGridRow =
      "flex flex-col w-full lg:h-1/3 lg:overflow-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:mb-8 lg:pb-1 lg:pt-1" +
      " ";
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-2 mb-4 flex justify-content-center content-center rounded overflow-hidden shadow-lg lg:mb-0 lg:pt-2 lg:pb-2" +
      " ";
    return (
      <div>
        <div className="h-screen mt-16 lg:pl-16 lg:pr-16 lg:mb-16">
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-7"}>
              <CompanyInfo
                corpId={corp_id}
                globalPeriod={current_period}
                name={corporations[corp_id].name}
                industry={"Corporation"}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-7 lg:col-end-10"}
            >
              <RegisteredVoters
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-10 lg:col-end-13"}
            >
              <ContributionShareByParty
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <ImputedIdeology corpId={corp_id} globalPeriod={current_period} />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TotalContributionsByDollar
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            >
              <TotalContributions
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <TopRecipientsByDollar
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TopRecipientsByDonation
                corpId={corp_id}
                globalPeriod={current_period}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            ></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
