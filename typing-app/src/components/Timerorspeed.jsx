import React from "react";
import { useEffect } from "react";

const Timerorspeed = (props) =>{
    const {time,timerRunning,setTimerRunning,theme} = props;

    useEffect(() => {
        if (time <= 0 && timerRunning) {
          setTimerRunning(false);
        }
      }, [time, timerRunning, setTimerRunning]);
    
    if(timerRunning){
        return <div className={`${theme === "Dark" ? "text-white" : "text-stone-800"} text-4xl`}>{time}</div>
    }else{
        return <div className={`${theme === "Dark" ? "text-blue-500" : "text-stone-700"} text-4xl`}>Results:</div>
    }
}

export default Timerorspeed;