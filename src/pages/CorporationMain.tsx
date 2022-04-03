import React from "react";
import { Link } from "react-router-dom";
import { MultipleDropDown } from "../components/MultipleDropDown";
import { DropDown } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CorporationMain() {
  return (
    <div>
      <Header />
      <div className="m-20 flex flex-col space-y-5">
        <p className="text-xl lg:text-4xl font-bold">Corporations</p>
        <div className="flex flex-col lg:flex-row-reverse items-center">
          <div className="flex flex-row items-center">
            <p className="px-5">Sort:</p>
            <DropDown />
            <p className="px-5">Filters:</p>
            <MultipleDropDown />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}