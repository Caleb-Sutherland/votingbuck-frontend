import React from "react";
import { FaUniversity } from "react-icons/fa";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useSelector } from "react-redux";

export default function UniversityInfo(props: any) {
  // Access the redux store
  const universities: Record<number, IUniversity> = useSelector(
    (state: DataState) => state.universities
  );

  const uni = universities[props.uniId];

  const tailwindBoldValue = "text-xl font-semibold" + " ";
  const tailwindValueLabel = "text-lg font-light" + " ";

  // Compute the uni enrollment component
  let enrollment;
  if (uni.uni_enrollment_low && uni.uni_enrollment_high) {
    enrollment = (
      <div className="flex">
        <span className={tailwindBoldValue}>
          {uni.uni_enrollment_low + "-" + uni.uni_enrollment_high}
        </span>
        <span className={tailwindValueLabel}> Enrollment</span>
      </div>
    );
  } else if (uni.uni_enrollment_low) {
    enrollment = (
      <div className="flex">
        <MdArrowDropUp size={30}/>
        <span className={tailwindBoldValue + "mr-1"}>{uni.uni_enrollment_low}</span>
        <span className={tailwindValueLabel}> Enrollment</span>
      </div>
    );
  } else {
    enrollment = (
      <div className="flex">
        <MdArrowDropDown size={30}/>
        <span className={tailwindBoldValue + "mr-1"}>{uni.uni_enrollment_high}</span>
        <span className={tailwindValueLabel}> Enrollment</span>
      </div>
    );
  }

  return (
    <div className="lg:pt-8 pl-8 pr-8 grid grid-rows-10">
      <div className="flex items-center">
        <FaUniversity size="4.5em" className="mr-3 mb-2" />
        <div className="mb-0.5">
          <div className="text-4xl font-bold mb-0.5">{uni.name}</div>
          <div className="text-lightGrayText">
            {uni.uni_acronym} - {uni.location} -{" "}
            {uni.uni_public ? "Public" : "Private"}
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-2 mt-3">
        <div>
          <span className={tailwindBoldValue}>{uni.uni_founded}</span>
          <span className={tailwindValueLabel}> Founded</span>
        </div>
        {enrollment}
        <div>
          <span className={tailwindBoldValue}>#{uni.uni_rank}</span>
          <span className={tailwindValueLabel}> Ranking</span>
        </div>
      </div>
      <div className="mb-8">
        {uni.description}
      </div>
      {uni.website ? (
        <div className="text-blue">
          <a href={uni.website} target="_blank" rel="noreferrer">University Website</a>
        </div>
      ) : null}
    </div>
  );
}
