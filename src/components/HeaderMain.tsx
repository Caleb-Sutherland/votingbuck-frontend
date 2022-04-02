import React from "react";
import { Link } from "react-router-dom";

export default function HeaderMain() {
  return (
    <header className="absolute z-10 w-full lg:h-20 flex items-center">
      <div className="w-full text-white flex items-center content-center justify-content-center flex-col lg:pl-12 lg:items-center lg:flex-row lg:items-start">
        <div className="w-full flex flex-col items-center lg:flex-row lg:items-center">
          <Link className="text-3xl font-semibold" to="/">votingbuck</Link>
          <Link className="lg:ml-24 text-xl font-normal text-opacity-75" to="/corporations">
            corporations
          </Link>
          <Link className="lg:ml-12 text-xl font-normal text-opacity-75" to="/universities">
            universities
          </Link>
          <Link className="lg:ml-12 text-xl font-normal text-opacity-75" to="/politicians">
            politicians
          </Link>
        </div>
      </div>
    </header>
  );
}