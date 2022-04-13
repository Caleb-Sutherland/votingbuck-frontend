import React, { useState } from "react";
import { Link } from "react-router-dom";

export function SearchBar() {
  const [queryResults, setQueryResults] = useState<any>(null);

  const handleChange = async (event: any) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
    const res = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/search/${event.target.value}`
    );
    const data = await res.json();
    if (event.target.value == "") {
      setQueryResults(null);
    } else {
      let remainingSpaces = 6;
      let pIndex = 0;
      let cIndex = 0;
      let uIndex = 0;
      const finalPoliticians: any = [];
      const finalCorporates: any = [];
      const finalUniversities: any = [];

      while (
        remainingSpaces > 0 &&
        (data.politicians[pIndex] ||
          data.corporates[cIndex] ||
          data.universities[uIndex])
      ) {
        if (data.politicians[pIndex]) {
          finalPoliticians.push(data.politicians[pIndex]);
          remainingSpaces--;
          pIndex++;
        }
        if (remainingSpaces > 0 && data.corporates[cIndex]) {
          finalCorporates.push(data.corporates[cIndex]);
          remainingSpaces--;
          cIndex++;
        }
        if (remainingSpaces > 0 && data.universities[uIndex]) {
          finalUniversities.push(data.universities[uIndex]);
          remainingSpaces--;
          uIndex++;
        }
      }

      const finalData = {
        politicians: finalPoliticians,
        corporates: finalCorporates,
        universities: finalUniversities,
        pCount: data.politicians.length,
        cCount: data.corporates.length,
        uCount: data.universities.length,
      };

      setQueryResults(finalData);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={handleChange}
        placeholder="corporations, universities or politicians"
        className="w-72 px-3 py-3 placeholder-blueGray300 text-blueGray600 relative bg-white bg-white text-sm border border-blueGray300 outline-none focus:outline-none focus:ring shadow-lg rounded-lg"
      />
      {queryResults ? (
        <div className="absolute top-12 w-72 px-0 py-3 text-blueGray600 bg-white bg-white text-sm outline-none shadow-lg rounded-lg z-50">
          {queryResults.politicians.length > 0 ? (
            <div>
              <p className="px-3">POLITICIANS</p>
            </div>
          ) : null}
          {queryResults.politicians.map((item: any, index: number) => {
            return (
              <Link key={index} to={"/politicians/" + item.value.id}>
                <div className="pl-8 pr-3 py-1 hover:bg-lightGray transition-colors">
                  <p>{item.value.name}</p>
                </div>
              </Link>
            );
          })}
          {queryResults.corporates.length > 0 ? (
            <div>
              <p className="px-3">CORPORATIONS</p>
            </div>
          ) : null}
          {queryResults.corporates.map((item: any, index: number) => {
            return (
              <Link key={index} to={"/corporations/" + item.value.id}>
                <div className="pl-8 pr-3 py-1 hover:bg-lightGray transition-colors">
                  <p>{item.value.name}</p>
                </div>
              </Link>
            );
          })}
          {queryResults.universities.length > 0 ? (
            <div>
              <p className="px-3">UNIVERSITIES</p>
            </div>
          ) : null}
          {queryResults.universities.map((item: any, index: number) => {
            return (
              <Link key={index} to={"/universities/" + item.value.id}>
                <div className="pl-8 pr-3 py-1 hover:bg-lightGray transition-colors">
                  <p>{item.value.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
