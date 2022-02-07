import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-teal-500 h-24 flex items-center">
      <div className="pl-12 text-white flex item-center">
        <Link className="text-3xl font-bold" to="/">Website</Link>
        <div className="ml-12 pl-12 flex items-center">
          <Link className="ml-12 text-xl font-medium text-opacity-75" to="organizations">
            Organizations
          </Link>
          <Link className="ml-12 text-xl font-medium text-opacity-75" to="individuals">
            Individuals
          </Link>
        </div>
      </div>
    </header>
  );
}
