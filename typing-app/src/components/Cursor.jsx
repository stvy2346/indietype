import React from "react";

const Cursor = (props) => {
  const { left, isActive } = props;
    return (
    <div
      id="cursor"
      style={{ left: `${left}px`, visibility: isActive ? "visible" : "hidden" }}
      className="absolute top-[245px] w-[1.5px] h-[37px] bg-blue-500 animate-blink transition-all duration-100"
    ></div>
  );
};

export default Cursor;
