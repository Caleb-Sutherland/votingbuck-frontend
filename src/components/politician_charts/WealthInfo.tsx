import React, { Dispatch, useEffect } from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";

export default function WealthInfo(props: any) {
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
    <div className="w-full lg:pt-8 pl-8 pr-8">
      <div className="flex justify-center mb-4 text-xl font-light">WEALTH</div>
      <div className="space-y-8">
        <div>
          <div className="text-xl font-semibold">N/A</div>
          <div className="text-lg font-light leading-none">Net Worth</div>
        </div>
        <div>
          <div className="text-xl font-semibold">N/A</div>
          <div className="text-lg font-light leading-none">Increase</div>
        </div>
        <div>
          <div className="text-xl font-semibold">N/A</div>
          <div className="text-lg font-light leading-none">
            Rank Among 523 Politicians
          </div>
        </div>
      </div>
    </div>
  );
}
