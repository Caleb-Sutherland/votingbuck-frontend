import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addPoliticianPeriod } from "../store/actions/politicianActionCreators";

import IdeologyDistribution from "../components/politician_charts/IdeologyDistribution";
import TopDonationsDollarsByIndustry from "../components/politician_charts/TopDonationsDollarsByIndustry";
import TopDonationsDollarsByCorporation from "../components/politician_charts/TopDonationsDollarsByCorporation";
import TopDonationsDollarsByUniversity from "../components/politician_charts/TopDonationsDollarsByUniversity";
import PoliticianInfo from "../components/politician_charts/PoliticianInfo";
import TileSelectBox from "../components/TileSelectBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { DataState } from "../interfaces/global.interface";
import { Politician as IPolitician } from "../interfaces/politician.interface";
import PowerInfo from "../components/politician_charts/PowerInfo";
import WealthInfo from "../components/politician_charts/WealthInfo";

export default function Politician() {
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
  if (!url_params.poliId) {
    return <div>Politician not specified!</div>;
  }
  const poli_id: string = url_params.poliId;

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addPoliticianPeriod(poli_id, current_period));
  }, [dispatch, current_period, poli_id]);

  // Access the redux store
  const politicians: Record<string, IPolitician> = useSelector(
    (state: DataState) => state.politicians
  );

  if (
    politicians[poli_id] !== undefined &&
    politicians[poli_id].periods[current_period] !== undefined
  ) {
    const tailwindGridRow =
      "flex flex-col w-full h-screen mb-12 lg:mb-0 lg:h-80 2xl:h-96 lg:overflow-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-4 lg:pt-4 lg:pt-1" +
      " ";
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-6 mb-4 h-1/3 flex justify-content-center content-center rounded overflow-hidden shadow-lg lg:mb-0 lg:pt-2 lg:pb-6 lg:pl-2 lg:pr-2 lg:h-full" +
      " ";
    return (
      <div>
        <Header />
        <div className="flex w-full mt-4 lg:mb-4 lg:mt-8 justify-end lg:pl-16 lg:pr-16 lg:mb-8 h-10">
          <div className="mt-0.5 mr-2 flex items-center text-gray-600 font-semibold text-regular lg:text-lg">
            <span>Data Period</span>
          </div>
          <TileSelectBox
            onChange={setCurrentPeriod}
            defaultValue={current_period}
          />
        </div>
        <div className="h-fit lg:pl-16 lg:pr-16 lg:mb-16">
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-7"}>
              <PoliticianInfo poliId={poli_id} />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-7 lg:col-end-11"}
            >
              <PowerInfo poliId={poli_id} />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-11 lg:col-end-13"}
            >
              <WealthInfo poliId={poli_id} />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <IdeologyDistribution
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TopDonationsDollarsByIndustry
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            >
              <TopDonationsDollarsByCorporation
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <TopDonationsDollarsByUniversity
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}
            ></div>
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
