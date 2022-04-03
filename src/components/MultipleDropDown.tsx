import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function MultipleDropDown() {
  const [isOpen, SetIsOpen] = useState<boolean>(false);
  const [appliedItems, SetAppliedItems] = useState<string[]>([]);
  const items: string[] = [
    "test",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
    "test11",
    "test12",
    "test13",
    "test14",
    "test15",
    "test16",
    "test17",
    "test18",
    "test19",
    "test20",
  ];

  const handleClick = () => {
    SetIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    if (appliedItems.includes(item)) {
      const newAppliedItems: string[] = [];
      appliedItems.forEach((element: string) => {
        if (element != item) {
          newAppliedItems.push(element);
        }
      });
      SetAppliedItems(newAppliedItems);
    } else {
      const newAppliedItems: string[] = [...appliedItems];
      newAppliedItems.push(item);
      SetAppliedItems(newAppliedItems);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="my-2 lg:my-0 w-52 p-3 text-blueGray600 relative bg-white text-sm border border-blueGray300 outline-none shadow-lg rounded-lg flex flex-row items-center justify-between"
      >
        <p className="text-left">
          {appliedItems.length > 0
            ? appliedItems.length > 1
              ? "Multiple (" + appliedItems.length + ")"
              : appliedItems[0]
            : "None"}
        </p>
        <GrDown />
      </button>
      {isOpen ? (
        <div className="absolute top-12 w-52 px-0 py-3 text-blueGray600 bg-white bg-white text-sm outline-none shadow-lg rounded-lg max-h-96 overflow-y-auto z-50">
          {items.map((item: string, index: number) => {
            return (
              <div key={index}>
                <div
                  onClick={() => handleItemClick(item)}
                  className="px-3 py-1 hover:bg-lightGray transition-colors cursor-pointer"
                >
                  <p className={appliedItems.includes(item) ? "font-bold" : ""}>
                    {item}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
