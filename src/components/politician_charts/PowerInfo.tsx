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
  
  return (
    <div className="w-full lg:pt-8 pl-20 pr-20">
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
      <div className="flex mt-3">
        <div>
          <div className="text-xl font-semibold">{timeInCongress}</div>
          <div className="text-lg font-light leading-none">
            Years in Congress
          </div>
        </div>
      </div>
      <div className="mt-5">
        {poli.committee.length > 0 ? (
          poli.committee.map((item, index) => {
            return (
              <div className="text-lg leading-none mb-2" key={index}>
                <div className="font-semibold">{item.name}</div>
                <div className="font-regular">{"Member Rank " + item.rank}</div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="text-xl font-semibold">
              {poli.senate_exit_reason
                ? poli.senate_exit_reason
                : poli.house_exit_reason}
            </div>
            <div className="text-lg font-light leading-none">Note of Interest</div>
          </div>
        )}
      </div>
    </div>
  );
}
