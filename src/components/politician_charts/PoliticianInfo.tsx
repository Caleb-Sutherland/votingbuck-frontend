import React from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";

export default function PoliticianInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  // Get politician age from DOB
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
  console.log(poli);
  const temp =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  return (
    <div className="lg:pt-2 pl-8 pr-8 flex flex-col overflow-y-auto">
      <div className="flex items-center">
        <GiPublicSpeaker size={85} className="mr-6" />
        <div className="mb-0.5">
          <div className="text-xl lg:text-4xl font-bold mb-0.5">
            {poli.name}
          </div>
          <div className="text-gray-600 text-xs lg:text-base">
            {getAge(poli.dob) + " Years Old"}
            {poli.schoolInfo && poli.schoolInfo.length > 0
              ? " ‧ " +
                poli.schoolInfo[0].name +
                " (#" +
                poli.schoolInfo[0].rank +
                ")"
              : null}
          </div>
        </div>
      </div>
      <div className="flex space-x-8 mt-0.5 lg:mb-2 lg:mt-2">
        <div className="text-base lg:text-xl font-semibold">
          {poli.party.toLowerCase() === "democratic" ? (
            <span className="text-blue">
              {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
            </span>
          ) : poli.party.toLowerCase() === "republican" ? (
            <span className="text-red">
              {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
            </span>
          ) : (
            <span className="text-gray-600">
              {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
            </span>
          )}
        </div>
        <div>
          <span className="text-base lg:text-xl font-semibold">
            {parseFloat(poli.ideology).toFixed(2)}
          </span>
          <span className="text-base lg:text-xl font-light"> Ideology</span>
        </div>
        {poli.state ? (
          <div>
            <span className="text-base lg:text-xl font-semibold">
              {poli.state.toUpperCase()}
            </span>
            <span className="text-base lg:text-xl font-light"> State</span>
          </div>
        ) : null}
      </div>
      <div className="mt-2 lg:mb-2 lg:mt-4 text-sm lg:text-lg text-gray-600">
        {temp}
        {/* {poli.description} */}
      </div>
    </div>
  );
}
