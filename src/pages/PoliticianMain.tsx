import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { OrderedList } from "../components/OrderedList";

export default function PoliticianMain() {
  const sortItems = [
    "Time in Office, Ascending",
    "Time in Office, Descending",
    "Alphabet, Ascending",
    "Alphabet, Descending",
  ];
  const filterItems = [
    "Senate",
    "House",
    "Active",
    "Inactive",
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
      <div className="h-screen m-20 flex flex-col space-y-5">
        <p className="text-xl lg:text-4xl font-bold">Politicians</p>
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
