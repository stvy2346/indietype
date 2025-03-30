import React from "react";

const Restart = (props) => {
    const {onRestart, theme} = props;
    
    const handleRestart = (e) => {
        onRestart();
        e.currentTarget.blur();
    };
    
    return(
        <button  
            onClick={handleRestart} 
            className={`${theme === "Dark" ? "text-zinc-500 hover:text-blue-500" : "text-stone-400 hover:text-stone-600"} p-0 border-none text-3xl w-10 h-10`}
        >
            <i className="fa-solid fa-rotate-right"></i>
        </button>
    )
}

export default Restart;