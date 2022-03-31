import React, { Dispatch, useEffect } from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";

export default function PowerInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  const poli = politicians[props.poliId];

  // Compute politicians time in congress
  let timeInHouse = "N/A";
  let timeInSenate = "N/A";
  let timeInCongress = 0;
  for (let i = 0; i < poli.timeInCongress.length; i++) {
    const start = new Date(poli.timeInCongress[i].startdate);
    const end = new Date(poli.timeInCongress[i].enddate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    console.log(startYear);
    if (poli.timeInCongress[i].position.toLowerCase() === "house") {
      timeInHouse = startYear + " - " + endYear;
    } else if (poli.timeInCongress[i].position.toLowerCase() === "senate") {
      timeInSenate = startYear + " - " + endYear;
    }

    timeInCongress += endYear - startYear;
  }
  console.log(politicians[props.poliId]);
  const temp =
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple  is the largest information technology company by revenue (totaling US$365.8 billion in 2021) and, as of January 2021, it is the world's most valuable company...";
  return (
    <div className="w-full lg:pt-8 pl-16 pr-16">
      <div className="flex justify-center mb-2 text-xl font-light">POWER</div>
      <div className="flex justify-between">
        <div>
          <div className="text-xl font-semibold">{timeInSenate}</div>
          <div className="text-lg font-light leading-none">Time in Senate</div>
        </div>
        <div>
          <div className="text-xl font-semibold">{timeInHouse}</div>
          <div className="text-lg font-light leading-none">Time in House</div>
        </div>
      </div>
      <div className="flex mt-4">
        <div>
          <div className="text-xl font-semibold">{timeInCongress}</div>
          <div className="text-lg font-light leading-none">
            Years in Congress
          </div>
        </div>
      </div>
      <div className="mt-4">
        {poli.committee.length > 0 ? (
          poli.committee.map((item, index) => {
            return (
              <div className="text-base font-semibold" key={index}>
                {item.name + " ‧ " + item.rank}
              </div>
            );
          })
        ) : (
          <div className="text-xl font-semibold">N/A</div>
        )}
        <div className="text-lg font-light leading-none">Committees</div>
      </div>
    </div>
  );
}
