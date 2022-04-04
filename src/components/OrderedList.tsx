import React, { useState } from "react";
import { GrDown } from "react-icons/gr";
import { Link } from "react-router-dom";

export function OrderedList(props: any) {

  return (
    <div className="relative">
        <p>{props.sort} {props.filters}</p>
    </div>
  );
}
