import React, { useState, useEffect, useCallback } from "react";
import TestChart from "../components/TestChart";
import TestPieChart from "../components/TestPieChart";
import Tile from "../components/Tile";
import { data as tempData } from "../components/TempData";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addPeriod } from "../store/actions/periodActionCreators";

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

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();
  const data: Record<string, IPeriod> = useSelector(
    (state: DataState) => state.periods
  );

  // Load up the current period's data
  dispatch(addPeriod(current_period));

  useEffect(() => {
    // If we are looking at a different organization then clear the redux store

    
    
  }, [current_period]);

  

  if (data[current_period] !== undefined) {
    return (
      <div>
        <div className="ml-16 mt-16 mb-8">
          <h1 className="text-3xl font-bold">Random Organization</h1>
          <span>Corporation</span>
        </div>
        <div className="container mx-auto h-screen w-full overflow-auto">
          <div className="h-2/6 w-full p-4 flex space-x-4 border-b border-b-black-300">
            {data[default_period].orgInfo.name}
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
