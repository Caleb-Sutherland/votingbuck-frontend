import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addPoliticianPeriod } from "../store/actions/politicianActionCreators";

import IdeologyDistribution from "../components/politician_charts/IdeologyDistribution";
import TileSelectBox from "../components/TileSelectBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
  const poli_id: number = parseInt(url_params.poliId);

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addPoliticianPeriod(poli_id, current_period));
  }, [dispatch, current_period]);

  // Access the redux store
  const politicians: Record<number, IPolitician> = useSelector(
    (state: DataState) => state.politicians
  );

  if (
    politicians[poli_id] !== undefined &&
    politicians[poli_id].periods[current_period] !== undefined
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
              
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-7 lg:col-end-10"}
            >
              
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-10 lg:col-end-13"}
            >
              
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <IdeologyDistribution globalPeriod={current_period} poliId={poli_id}/>
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            >
              
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              
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
    return <div>Loading...</div>;
  }
}
