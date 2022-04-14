import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function DropDown(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const items: any[] = [...props.items];
  const [appliedItem, setAppliedItem] = useState<any>(items[props.defaultItem]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    updateItem(item);
  };

  const updateItem = (updatedItem: any) => {
    setAppliedItem(updatedItem);
    if (props.setItem) { props.setItem(updatedItem); }
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="my-2 lg:my-0 w-52 p-3 text-blueGray600 relative bg-white text-sm border border-blueGray300 outline-none shadow-lg rounded-lg flex flex-row items-center justify-between"
      >
        <p className="text-left whitespace-nowrap w-40 overflow-hidden text-ellipsis">{appliedItem.display}</p>
        <GrDown />
      </button>
      {isOpen ? (
        <div className="absolute top-12 w-52 px-0 py-3 text-blueGray600 bg-white bg-white text-sm outline-none shadow-lg rounded-lg max-h-96 overflow-y-auto z-40">
          {items.map((item: any, index: number) => {
            return (
              <div key={index}>
                <div
                  onClick={() => handleItemClick(item)}
                  className="px-3 py-1 hover:bg-lightGray transition-colors cursor-pointer"
                >
                  <p className={appliedItem.display == item.display ? "font-bold" : ""}>
                    {item.display}
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
