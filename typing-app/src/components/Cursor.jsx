import React from "react";

const Cursor = (props) =>{
    const {isActive} = props;
    return(
        <div id="cursor" className={`${isActive ? "visible" : "hidden"}`}></div>
    )
}

export default Cursor;