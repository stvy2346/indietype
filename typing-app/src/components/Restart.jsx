import React from "react";

const Restart = ({onRestart}) =>{
    return(
        <button  
            onClick={onRestart} 
            className="rounded-md px-4 py-2 bg-zinc-700 text-zinc-500 hover:text-blue-500 active:bg-zinc-800"
        >
            New Game
        </button>
    )
}

export default Restart;