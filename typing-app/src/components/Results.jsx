import React from "react";

const Results = (props) =>{
    // const {getWPM,initialTime,getRawSpeed,theme,getAccuracy} = props;
    const {initialTime,theme,getTypingStats} = props;
    const stats = getTypingStats();
    return(
        <div className="p-4 rounded-lg mx-16 mb-10 py-2 min-h-[10.50rem] flex gap-35 items-center">
            <div className="flex flex-col ml-20">
                <div className="text-zinc-500 text-3xl">
                    wpm
                </div>
                <div className={`${theme === "Dark" ? "text-blue-500" : "text-stone-700"} text-8xl`}>
                    {stats.wpm}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-zinc-500 text-3xl">
                    acc
                </div>
                <div className={`${theme === "Dark" ? "text-blue-500" : "text-stone-700"} text-8xl`}>
                    {`${stats.accuracy}%`}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-zinc-500 text-3xl">
                    raw
                </div>
                <div className={`${theme === "Dark" ? "text-blue-500" : "text-stone-700"} text-8xl`}>
                    {stats.rawSpeed}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="text-zinc-500 text-3xl">
                    time
                </div>
                <div className={`${theme === "Dark" ? "text-blue-500" : "text-stone-700"} text-8xl`}>
                    {`${initialTime}s`}
                </div>
            </div>
        </div>
    )
}

export default Results;