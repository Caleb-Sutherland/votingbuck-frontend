import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function DropDown(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const items: string[] = [...props.items];
  const [appliedItem, setAppliedItem] = useState<string>(items[props.defaultItem]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    updateItem(item);
  };

  const updateItem = (updatedItems: string) => {
    setAppliedItem(updatedItems);
    if (props.setItem) { props.setItem(updatedItems); }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="my-2 lg:my-0 w-52 p-3 text-blueGray600 relative bg-white text-sm border border-blueGray300 outline-none shadow-lg rounded-lg flex flex-row items-center justify-between"
      >
        <p className="text-left whitespace-nowrap w-40 overflow-hidden text-ellipsis">{appliedItem}</p>
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
                  <p className={appliedItem == item ? "font-bold" : ""}>
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
