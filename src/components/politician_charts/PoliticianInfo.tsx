import React, { Dispatch, useEffect } from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";

export default function PoliticianInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  const getAge = (dob: string) => {
    const today = new Date();
    const bday = new Date(dob);
    let age = today.getFullYear() - bday.getFullYear();
    const m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return age;
  };

  const poli = politicians[props.poliId];
  console.log(politicians[props.poliId]);
  const temp =
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple  is the largest information technology company by revenue (totaling US$365.8 billion in 2021) and, as of January 2021, it is the world's most valuable company...";
  return (
    <div className="w-full lg:pt-8 pl-8 pr-8">
      <div className="flex items-center">
        <GiPublicSpeaker size={85} className="mr-6" />
        <div className="mb-0.5">
          <div className="text-2xl lg:text-4xl font-bold mb-0.5">
            {poli.name}
          </div>
          <div className="text-gray-600">
            {getAge(poli.dob) + " Years Old"}{poli.schoolInfo && poli.schoolInfo.length > 0 ? " ‧ " + poli.schoolInfo[0].name + " (#" + poli.schoolInfo[0].rank + ")" : null}
          </div>
        </div>
      </div>
      <div className="flex space-x-8 mb-2 mt-4">
        <div className="text-xl font-semibold">
          {poli.party.toLowerCase() === "democrat" ? <span className="text-blue">{"Democratic"}</span> : poli.party.toLowerCase() === "republican" ? <span className="text-red">{poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}</span> : <span className="text-gray-600">{poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}</span>}
        </div>
        <div>
          <span className="text-xl font-semibold">{parseFloat(poli.ideology).toFixed(2)}</span>
          <span className="text-lg font-light"> Ideology</span>
        </div>
        <div>
          <span className="text-xl font-semibold">{poli.state.toUpperCase()}</span>
          <span className="text-lg font-light"> State</span>
        </div>
      </div>
      <div className="mb-2 mt-6 text-lg overflow-y-auto text-gray-600">
        {poli.description}
      </div>
    </div>
  );
}
