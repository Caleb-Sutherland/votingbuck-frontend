import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { OrderedList } from "../components/OrderedList";

export default function UniversityMain() {
  const sortItems = [
    "Rank, Ascending",
    "Rank, Descending",
    "Alphabet, Ascending",
    "Alphabet, Descending",
  ];
  const filterItems = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MP",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UM",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  const [sort, setSort] = useState<string>(sortItems[0]);
  const [filters, setFilters] = useState<string[]>([]);
  const [results, setResults] = useState<any>({ test: "test" });

  return (
    <div>
      <Header />
      <div className="m-20 flex flex-col space-y-5">
        <p className="text-xl lg:text-4xl font-bold">Corporations</p>
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="flex flex-row items-center">
            <p className="px-5">Sort:</p>
            <DropDown items={sortItems} defaultItem={0} setItem={setSort} />
            <p className="px-5">Filters:</p>
            <MultipleDropDown items={filterItems} setItems={setFilters} />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <OrderedList sort={sort} filters={filters} />
          {/*results.map(function (entry: any, index: number) {
          <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
            <div>
              <p>{"Test"}</p>
            </div>
            <div className="flex flex-row items-center space-x-2">
              <p
                className="text-right"
              ></p>
              <FiExternalLink size="1.1em" />
            </div>
          </div>
        })*/}
        </div>
      </div>
      <Footer />
    </div>
  );
}
