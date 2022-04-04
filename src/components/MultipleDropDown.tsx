import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function MultipleDropDown(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appliedItems, setAppliedItems] = useState<string[]>([]);
  const items: string[] = [...props.items];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    if (appliedItems.includes(item)) {
      const newAppliedItems: string[] = [];
      appliedItems.forEach((element: string) => {
        if (element != item) {
          newAppliedItems.push(element);
        }
      });
      updateItems(newAppliedItems);
    } else {
      const newAppliedItems: string[] = [...appliedItems];
      newAppliedItems.push(item);
      updateItems(newAppliedItems);
    }
  };

  const updateItems = (updatedItems: string[]) => {
    setAppliedItems(updatedItems);
    if (props.setItems) { props.setItems(updatedItems); }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="my-2 lg:my-0 w-52 p-3 text-blueGray600 relative bg-white text-sm border border-blueGray300 outline-none shadow-lg rounded-lg flex flex-row items-center justify-between"
      >
        <p className="text-left whitespace-nowrap w-40 overflow-hidden text-ellipsis">
          {appliedItems.length > 0
            ? appliedItems.length > 1
              ? "Multiple (" + appliedItems.length + ")"
              : appliedItems[0]
            : "None"}
        </p>
        <GrDown />
      </button>
      {isOpen ? (
        <div className="absolute top-12 w-52 px-0 py-3 text-blueGray600 bg-white bg-white text-sm outline-none shadow-lg rounded-lg max-h-96 overflow-y-auto z-40">
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
