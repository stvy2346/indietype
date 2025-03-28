import React from "react";

const Cursor = (props) => {
  const {left,top, isActive,theme } = props;
    return (
    <div
      id="cursor"
      style={{ left: `${left}px`,top: `${top}px`, visibility: isActive ? "visible" : "hidden" }}
      className={`${theme === "Dark" ? "bg-blue-500" : "bg-stone-700"}`}
    ></div>
  );
};

export default Cursor;
