import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="h-20 flex items-center absolute z-10 bg-neutral-700 w-full">
      <p className="text-neutral-400 text-center w-full">Copyright &copy; 2022 votingbuck &mdash; All Rights Reserved.</p>
    </footer>
  );
}
