import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Corporation } from "../../interfaces/corporation.interface";
import { DataState } from "../../interfaces/global.interface";
import { formatDollarValueToString } from "../../helper/formatting";

export default function CompanyInfo(props: any) {
  // Access the redux store
  const corporations: Record<number, Corporation> = useSelector(
    (state: DataState) => state.corporations
  );

  const corp = corporations[props.corpId];
  const temp =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="lg:pt-2 pl-8 pr-8 flex flex-col overflow-y-auto">
      <div className="flex items-center">
        <BsBuilding size={85} className="mr-6" />
        <div className="mb-0.5">
          <div className="text-xl lg:text-4xl font-bold mb-0.5">
            {corp.name}
          </div>
          <div className="text-gray-600 text-xs lg:text-base">
            {corp.industry} ‧ {corp.location}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-0.5 mt-1 lg:mb-2 lg:mt-4">
        <div>
          <span className="text-base lg:text-xl font-semibold">
            {corp.corp_revolvers
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          <span className="text-base lg:text-xl font-light"> Revolvers</span>
        </div>
        <div>
          <span className="text-base lg:text-xl font-semibold">${formatDollarValueToString(corp.corp_lobby)}</span>
          <span className="text-base lg:text-xl font-light"> Lobbying Expenditure</span>
        </div>
      </div>
      <div className="mb-2 mt-3 text-sm lg:text-lg text-gray-600">
        {temp}
      </div>
    </div>
  );
}
