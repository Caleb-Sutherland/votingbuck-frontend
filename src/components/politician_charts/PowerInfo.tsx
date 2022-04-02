import React from "react";
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

    if (poli.timeInCongress[i].position.toLowerCase() === "house") {
      timeInHouse = startYear + " - " + endYear;
    } else if (poli.timeInCongress[i].position.toLowerCase() === "senate") {
      timeInSenate = startYear + " - " + endYear;
    }

    timeInCongress += endYear - startYear;
  }
  
  return (
    <div className="w-full pl-8 pr-8 lg:pt-8 2xl:pl-20 2xl:pr-20 overflow-y-auto">
      <div className="flex justify-center mb-2 text-lg lg:text-xl font-light">POWER</div>
      <div className="flex justify-between">
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInSenate}</div>
          <div className="text-base lg:text-lg font-light leading-none">Time in Senate</div>
        </div>
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInHouse}</div>
          <div className="text-base lg:text-lg font-light leading-none">Time in House</div>
        </div>
      </div>
      <div className="flex mt-3">
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInCongress}</div>
          <div className="text-base lg:text-lg font-light leading-none">
            Years in Congress
          </div>
        </div>
      </div>
      <div className="mt-5">
        {poli.committee.length > 0 ? (
          poli.committee.map((item, index) => {
            return (
              <div className="text-base lg:text-lg leading-none mb-2" key={index}>
                <div className="font-semibold">{item.name}</div>
                <div className="font-base">{"Member Rank " + item.rank}</div>
              </div>
            );
          })
        ) : (
          <div>
            <div className="text-lg lg:text-xl font-semibold">
              {poli.senate_exit_reason
                ? poli.senate_exit_reason
                : poli.house_exit_reason}
            </div>
            <div className="text-base lg:text-lg font-light leading-none">Note of Interest</div>
          </div>
        )}
      </div>
    </div>
  );
}
