import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addUniversityPeriod } from "../store/actions/universityActionCreators";

import TopRecipientsByDollar from "../components/university_charts/TopRecipientsByDollar";
import TopRecipientsByDonation from "../components/university_charts/TopRecipientsByDonation";
import ContributionShareByParty from "../components/university_charts/ContributionShareByParty";
import ImputedIdeology from "../components/university_charts/ImputedIdeology";
import TotalContributionsByDollar from "../components/university_charts/TotalContributionsByDollar";
import TotalContributions from "../components/university_charts/TotalContributions";
import UniversityInfo from "../components/university_charts/UniversityInfo";
import RegisteredVoters from "../components/university_charts/RegisteredVoters";
import TileSelectBox from "../components/TileSelectBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { DataState } from "../interfaces/global.interface";
import { University as IUniversity } from "../interfaces/university.interface";
export default function University() {
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
  if (!url_params.uniId) {
    return <div>University not specified!</div>;
  }
  const uni_id: number = parseInt(url_params.uniId);

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addUniversityPeriod(uni_id, current_period));
  }, [dispatch, current_period]);

  // Access the redux store
  const universities: Record<number, IUniversity> = useSelector(
    (state: DataState) => state.universities
  );

  if (
    universities[uni_id] !== undefined &&
    universities[uni_id].periods[current_period] !== undefined
  ) {
    const tailwindGridRow =
      "flex flex-col w-full h-screen mb-12 lg:mb-0 lg:h-80 2xl:h-96 lg:overflow-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-4 lg:pt-4 lg:pt-1" +
      " ";
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-6 mb-4 h-1/3 flex justify-content-center content-center rounded lg:overflow-hidden shadow-lg lg:mb-0 lg:pt-2 lg:pb-6 lg:pl-2 lg:pr-2 lg:h-full" +
      " ";
    return (
      <div>
        <Header />
        <div className="flex w-full mt-4 lg:mb-4 lg:mt-8 justify-end lg:pl-16 lg:pr-16 lg:mb-8 h-10">
          <div className="mt-0.5 mr-2 flex items-center text-gray-600 font-semibold text-regular lg:text-lg"><span>Data Period</span></div>
          <TileSelectBox
            onChange={setCurrentPeriod}
            defaultValue={current_period}
          />
        </div>
        <div className="h-fit lg:pl-16 lg:pr-16 lg:mb-16">
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-7"}>
              <UniversityInfo
                uniId={uni_id}
                globalPeriod={current_period}
                name={universities[uni_id].name}
                industry={"Corporation"}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-7 lg:col-end-10"}
            >
              <RegisteredVoters uniId={uni_id} globalPeriod={current_period} />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-10 lg:col-end-13"}
            >
              <ContributionShareByParty
                uniId={uni_id}
                globalPeriod={current_period}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <ImputedIdeology uniId={uni_id} globalPeriod={current_period} />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TotalContributionsByDollar
                uniId={uni_id}
                globalPeriod={current_period}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            >
              <TotalContributions
                uniId={uni_id}
                globalPeriod={current_period}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <TopRecipientsByDollar
                uniId={uni_id}
                globalPeriod={current_period}
              />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TopRecipientsByDonation
                uniId={uni_id}
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
