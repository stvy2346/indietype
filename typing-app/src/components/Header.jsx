import React from "react";
import { FaBug } from "react-icons/fa"; 


const Header = (props) =>{
    const {theme,startNewGame} = props;
    return(
        <div className={`${theme === "Dark" ? "text-blue-600" : "text-stone-800"} py-10 mb-1 px-20`}>
            <div className="text-3xl flex justify-start gap-2 cursor-pointer" onClick={startNewGame}>
            <FaBug />
            <p>TypeSprint</p>
            </div>
        </div>
    )
}

export default Header;