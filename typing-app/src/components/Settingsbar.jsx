import React from "react";

const Settingbar = (props) =>{
    const {} = props;
    const timeOptions = [15, 30, 45, 60];
    const themeOptions = ["Light","Dark"]

    return(
        <div className="bg-red-500 text-zinc-900 p-4 rounded-md flex items-center max-w-[20rem] gap-15 mb-10">
            <div className="flex gap-5">
                {timeOptions.map((time)=>(
                    <button 
                        key={time}

                    >
                        {time}
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