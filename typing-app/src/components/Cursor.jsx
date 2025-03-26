import React from "react";

const Cursor = (props) => {
  const {left,top, isActive } = props;
    return (
    <div
      id="cursor"
      style={{ left: `${left}px`,top: `${top}px`, visibility: isActive ? "visible" : "hidden" }}
    ></div>
  );
};

export default Cursor;
