import React from "react";

const Settingbar = (props) =>{
    const {initialTime,setInitialTime,theme,setTheme,startNewGame} = props;
    const timeOptions = [15, 30, 45, 60];
    const themeOptions = ["Light","Dark"];

    const handleThemeChange = (themeOption) => {
        setTheme(themeOption);
        localStorage.setItem("theme",JSON.stringify(themeOption));
    }

    const handleTimeChange = (timeOption) =>{
        if(initialTime !== timeOption){
            setInitialTime(timeOption);
            localStorage.setItem("initialTime",JSON.stringify(timeOption));
            startNewGame();
        }
    }

    return(
        <div className={`${theme==="Dark" ? "bg-zinc-700 text-zinc-500" : "bg-stone-200 text-stone-400"} px-4 py-2 rounded-md flex items-center max-w-[25rem] gap-5 mb-10`}>
            <div className="flex gap-5">
                {timeOptions.map((timeOption)=>(
                    <button 
                        key={timeOption}
                        className={`${initialTime === timeOption 
                            ? theme === "Dark" ? "text-blue-500" : "text-stone-700" 
                            : ""} 
                            ${theme === "Dark" ? "hover:text-white" : "hover:text-stone-600"}`
                        }
                        onClick={()=>handleTimeChange(timeOption)}
                    >
                        {timeOption}
                    </button>
                ))}
            </div>
            <div className={`${theme === "Dark" ? "text-zinc-500" : "text-stone-400"} text-2xl`}>|</div>
            <div className="flex gap-5">
                {themeOptions.map((themeOption)=>(
                    <button 
                        key={themeOption}
                        className={`${theme === themeOption 
                            ? theme === "Dark" ? "text-blue-500" : "text-stone-700"
                            : ""
                        } 
                        ${theme === "Dark" ? "hover:text-white" : "hover:text-stone-600"}`}
                        onClick={()=>handleThemeChange(themeOption)}
                    >
                        {themeOption}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Settingbar;