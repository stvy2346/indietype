import React, { useEffect, useState } from "react";

const Cursor = (props) => {
  const {isActive, theme} = props;
  
  // Use responsive height classes based on the same breakpoints as the container
  const getHeightClass = () => {
    if (window.innerWidth >= 1280) return "h-9";
    if (window.innerWidth >= 1024) return "h-8";
    if (window.innerWidth >= 768) return "h-7";
    return "h-6";
  };
  
  const [heightClass, setHeightClass] = useState(getHeightClass());
  
  useEffect(() => {
    const updateHeight = () => {
      setHeightClass(getHeightClass());
    };
    
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  
  return (
    <div 
      className={`
        typing-cursor
        absolute
        w-0.5
        ${heightClass}
        ${theme === "Dark" ? "bg-blue-500" : "bg-stone-700"}
        ${isActive ? "animate-blink" : ""}
      `}
    />
  );
};

export default Cursor;
