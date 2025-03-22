import React from "react";

const Restart = ({onRestart}) =>{
    return(
        <button  
            onClick={onRestart} 
            className="p-0 border-none text-3xl text-zinc-500 hover:text-blue-500 w-10 h-10"
        >
            <i className="fa-solid fa-rotate-right"></i>
        </button>
    )
}

export default Restart;