import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Corporation } from "../../interfaces/corporation.interface";
import { DataState } from "../../interfaces/global.interface";

export default function CompanyInfo(props: any) {
  // Access the redux store
  const corporations: Record<number, Corporation> = useSelector(
    (state: DataState) => state.corporations
  );

  const corp = corporations[props.corpId];
  console.log(corp);
  const temp =
    "Apple Inc. is an American multinational technology company that specializes in consumer electronics, software and online services. Apple  is the largest information technology company by revenue (totaling US$365.8 billion in 2021) and, as of January 2021, it is the world's most valuable company...";
  return (
    <div className="lg:pt-8 pl-8 pr-8">
      <div className="flex items-center">
        <BsBuilding size={85} className="mr-6" />
        <div className="mb-0.5">
          <div className="text-2xl lg:text-4xl font-bold mb-0.5">
            {corp.name}
          </div>
          <div className="text-gray-600">
            {corp.industry} ‧ {corp.location}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-2 mt-4">
        <div>
          <span className="text-xl font-semibold">{corp.corp_revolvers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
          <span className="text-lg font-light"> Revolvers</span>
        </div>
        <div>
          <span className="text-xl font-semibold">$1.7Bln</span>
          <span className="text-lg font-light"> Lobbying Expenditure</span>
        </div>
      </div>
      <div className="mb-2 mt-6 text-lg overflow-y-auto text-gray-600">
        {temp}
      </div>
    </div>
  );
}
