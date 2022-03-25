import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-20 flex items-center absolute z-10 w-full">
      <div className="pl-12 text-white flex item-center">
        <Link className="text-3xl font-semibold" to="/">votingbuck</Link>
        <div className="ml-12 pl-12 flex items-center">
          <Link className="ml-12 text-xl font-normal text-opacity-75" to="corporates">
            corporates
          </Link>
          <Link className="ml-12 text-xl font-normal text-opacity-75" to="universities">
            universities
          </Link>
          <Link className="ml-12 text-xl font-normal text-opacity-75" to="politicians">
            politicians
          </Link>
        </div>
      </div>
    </header>
  );
}
