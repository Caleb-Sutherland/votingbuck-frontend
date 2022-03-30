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
import TileSelectBox from "../components/TileSelectBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";

export default function Corporation() {
  // Get the default current period
  const temp = new Date();
  const curr_year = temp.getFullYear();
  let start;
  let end;
  // Start with the current period one cycle back (in case data takes long to gather)
  if (curr_year % 2 === 0) {
    start = curr_year - 3;
    end = curr_year - 2;
  } else {
    start = curr_year - 2;
    end = curr_year - 1;
  }

  // Master period control
  const default_period = start.toString() + "-" + end.toString();
  const [current_period, setCurrentPeriod] = useState(default_period);

  // Get the corporation id from the url
  const url_params = useParams();
  if (!url_params.corpId) {
    return <div>Corporation not specified!</div>;
  }
  const corp_id: number = parseInt(url_params.corpId);

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addCorporationPeriod(corp_id, current_period));
  }, [dispatch, current_period]);

  // Access the redux store
  const corporations: Record<number, ICorporation> = useSelector(
    (state: DataState) => state.corporations
  );

  if (
    corporations[corp_id] !== undefined &&
    corporations[corp_id].periods[current_period] !== undefined
  ) {
    const tailwindGridRow =
      "flex flex-col w-full lg:h-1/3 lg:overflow-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-4 lg:pt-4 lg:pt-1" +
      " ";
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-2 mb-4 flex justify-content-center content-center rounded overflow-hidden shadow-lg lg:mb-0 lg:pt-2 lg:pb-2" +
      " ";
    return (
      <div>
        <Header />
        <div className="flex w-full lg:mb-4 lg:mt-8 justify-end lg:pr-16 lg:mb-16">
          <div className="mt-0.5 mr-2">Data Period</div>
          <TileSelectBox
            onChange={setCurrentPeriod}
            defaultValue={current_period}
          />
        </div>
        <div className="h-screen lg:pl-16 lg:pr-16 lg:mb-16">
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
        <Footer />
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}
