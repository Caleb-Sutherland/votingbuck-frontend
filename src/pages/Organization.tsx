import React, { useState, useEffect } from "react";
import TestChart from "../components/TestChart";
import TestPieChart from "../components/TestPieChart";
import Tile from "../components/Tile";
import { data as tempData } from "../components/TempData";

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
  const [data, setData] = useState<test>();

  useEffect(() => {
    getData();
  }, []);

  // This function can eventually retreive data from the backend (or we might want to set up an API helper file to do this)
  const getData = () => {
    setData(tempData);
  };

  console.log(data);
  return (
    <div>
      <div className="ml-16 mt-16 mb-8">
        <h1 className="text-3xl font-bold">Random Organization</h1>
        <span>Corporation</span>
      </div>
      

      <div className="container mx-auto h-screen w-full overflow-auto">
        <div className="h-2/6 w-full p-4 flex space-x-4 border-b border-b-black-300">
          <Tile
            graph={<TestChart data={data?.donationsByMonth.slice(11, 23)} />}
          />
          <Tile graph={<TestPieChart data={data?.topDonators} />} />
          <Tile />
        </div>
      </div>
    </div>
  );
}
