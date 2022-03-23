import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-red to-blue lg:h-14 flex items-center">
      <div className="w-full text-white flex items-center content-center justify-content-center flex-col lg:pl-24 lg:items-center lg:flex-row lg:items-start">
        <div className="w-full flex flex-col items-center lg:flex-row lg:items-center">
          <Link className="text-3xl font-bold" to="/">votingbuck</Link>
          <Link className="lg:ml-24 text-xl font-medium text-opacity-75" to="corporates">
            corporates
          </Link>
          <Link className="lg:ml-12 text-xl font-medium text-opacity-75" to="politicians">
            politicians
          </Link>
          <Link className="lg:ml-12 text-xl font-medium text-opacity-75" to="universities">
            universities
          </Link>
        </div>
      </div>
    </header>
  );
}
