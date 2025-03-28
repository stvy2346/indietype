import React from "react";

const Settingbar = (props) =>{
    const {initialTime,setInitialTime,theme,setTheme,time,setTime,startNewGame} = props;
    const timeOptions = [15, 30, 45, 60];
    const themeOptions = ["Light","Dark"]

    return(
        <div className="bg-zinc-700 text-zinc-500 px-4 py-2 rounded-md flex items-center max-w-[25rem] gap-5 mb-10">
            <div className="flex gap-5">
                {timeOptions.map((timeOption)=>(
                    <button 
                        key={timeOption}
                        className={`${initialTime === timeOption ? "text-blue-500" : ""} hover:text-white`}
                        onClick={()=>{
                            if(initialTime !== timeOption){
                                setInitialTime(timeOption);
                                setTime(timeOption);
                                startNewGame();
                            }
                        }}
                    >
                        {timeOption}
                    </button>
                ))}
            </div>
            <div className="text-2xl text-zinc-400">|</div>
            <div className="flex gap-5">
                {themeOptions.map((themeOption)=>(
                    <button 
                        key={themeOption}
                        className={`${theme === themeOption ? "text-blue-500" : ""}`}
                    >
                        {themeOption}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Settingbar;