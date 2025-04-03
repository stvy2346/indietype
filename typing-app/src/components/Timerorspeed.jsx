import React from "react";
import { useEffect } from "react";

const Timerorspeed = (props) =>{
    const {time,timerRunning,setTimerRunning} = props;

    useEffect(() => {
        if (time <= 0 && timerRunning) {
          setTimerRunning(false);
        }
      }, [time, timerRunning, setTimerRunning]);
    
    if(timerRunning){
        return <div className="text-[var(--text)] text-4xl">{time}</div>
    }else{
        return <div className="text-[var(--text-active)] text-4xl">Results:</div>
    }
}

export default Timerorspeed;