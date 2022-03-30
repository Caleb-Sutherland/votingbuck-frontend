import React from "react";
import { IoSchoolSharp } from "react-icons/io5";

export default function UniversityInfo(props: any) {
  return (
    <div className="lg:pt-8 pl-8 pr-8">
      <div className="flex">
        <IoSchoolSharp size={60} className="mr-3"/>
        <div className="mb-0.5">
          <div className="text-4xl font-bold mb-0.5">
            Harvard University (HU)
          </div>
          <div className="text-lightGrayText">Private, Founded in 1636</div>
        </div>
      </div>
      <div className="mb-2 mt-2">
        <span>Massachusetts Hall Cambridge 02138 Massachusetts Road</span>
      </div>
      <div className="mb-2">
        <a href="https://www.harvard.edu">https://www.harvard.edu</a>
      </div>
      <div>40-45k Students, 2-2.5k Staff</div>
    </div>
  );
}
