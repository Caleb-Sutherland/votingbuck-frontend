import React from "react";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";
import { ordinalSuffixOf } from "../../helper/formatting";
import RealDataTooltip from "../RealDataTooltip";

export default function PowerInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  const poli = politicians[props.poliId];

  // Compute politicians time in congress
  let timeInHouse = "N/A";
  let timeInSenate = "N/A";
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
  }

  return (
    <div className="w-full pl-8 pr-8 lg:pt-8 2xl:pl-20 2xl:pr-20 overflow-y-auto">
      <div className="flex justify-center mb-2 text-lg lg:text-xl font-light">
        <span>POWER</span><RealDataTooltip/>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInSenate}</div>
          <div className="text-base lg:text-lg font-light leading-none">
            Time in Senate
          </div>
        </div>
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInHouse}</div>
          <div className="text-base lg:text-lg font-light leading-none">
            Time in House
          </div>
        </div>
      </div>
      <div className="mt-5">
        {poli.committee.map((item, index) => {
          return (
            <div className="text-base lg:text-lg leading-none mb-2" key={index}>
              <div className="font-medium"><span className="font-normal">{ordinalSuffixOf(item.rank) + " ranked member in "}</span>{item.name}</div>
            </div>
          );
        })}
        {poli.committee.length > 0 ? <div className="font-light">Committees</div> : null}
      </div>
    </div>
  );
}
