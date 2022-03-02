import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-teal-500 lg:h-24 flex items-center">
      <div className="w-full text-black flex items-center content-center justify-content-center flex-col lg:pl-12 lg:items-center lg:flex-row lg:items-start">
        <Link className="text-3xl font-bold" to="/">Website</Link>
        <div className="w-full flex flex-col items-center lg:ml-12 lg:pl-12 lg:flex-row lg:items-center">
          <Link className="lg:ml-12 text-xl font-medium text-opacity-75" to="corporates">
            Corporates
          </Link>
          <Link className="lg:ml-12 text-xl font-medium text-opacity-75" to="politicians">
            Politicians
          </Link>
          <Link className="lg:ml-12 text-xl font-medium text-opacity-75" to="universities">
            Universities
          </Link>
        </div>
      </div>
    </header>
  );
}
