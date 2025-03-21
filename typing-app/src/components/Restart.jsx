import React from "react";

const Restart = ({onRestart}) =>{
    return(
        <button  
            onClick={onRestart} 
            className="m-10 text-3xl text-zinc-500 hover:text-blue-500"
        >
            <i className="fa-solid fa-rotate-right"></i>
        </button>
    )
}

export default Restart;