import React, { useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function OrderedList(props: any) {
  const [results, setResults] = useState<any[]>(["empty"]);

  useEffect(() => {
    if (results[0] == "empty") {
      setResults([
        { id: 1, name: "Company", industry: "Manufacturing" },
        { id: 2, name: "Company 2", industry: "Agriculture" },
      ]);
    }
  });

  return (
    <div className="relative">
      <div className="flex flex-row p-4">
        <p className="grow-1 basis-1/3">Name</p>
        <p className="grow-1 basis-1/3">Industry</p>
        <div className="grow-1 basis-1/3" />
      </div>
      <div className="flex flex-col space-y-4">
        {results.map((entry: any, index: number) => {
          return (
            <Link key={index} to={"/politicians/" + entry.id}>
              <div className="flex flex-row justify-between bg-white shadow-lg rounded-lg p-4">
                <p className="grow-1 basis-1/3">{entry.name}</p>
                <p className="grow-1 basis-1/3">{entry.industry}</p>
                <div className="flex flex-row-reverse grow-1 basis-1/3">
                  <FiExternalLink size="1.1em" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
