import React from "react";

const Settingbar = (props) =>{
    const {initialTime,setInitialTime,theme,setTheme,time,setTime} = props;
    const timeOptions = [15, 30, 45, 60];
    const themeOptions = ["Light","Dark"]

    return(
        <div className="bg-zinc-700 text-zinc-500 p-4 rounded-md flex items-center max-w-[20rem] gap-15 mb-10">
            <div className="flex gap-5">
                {timeOptions.map((timeOption)=>(
                    <button 
                        key={timeOption}
                        className={`${initialTime === timeOption ? "text-blue-500" : ""}`}
                        onClick={()=>{
                            if(initialTime !== timeOption){
                                setInitialTime(timeOption);
                                setTime(timeOption);
                            }
                        }}
                    >
                        {timeOption}
                    </button>
                ))}
            </div>
            <div className="flex gap-5">
                {themeOptions.map((theme)=>(
                    <button key={theme}>
                        {theme}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Settingbar;