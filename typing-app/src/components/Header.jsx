import React from "react";

const Header = (props) =>{
    const {theme} = props;
    return(
        <div className={`${theme === "Dark" ? "text-blue-600" : "text-stone-800"} text-3xl flex justify-start py-10 mb-1 px-20 gap-2`}>
            <i className="fa-solid fa-bug"></i>
            <p>TypeSprint</p>
        </div>
    )
}

export default Header;