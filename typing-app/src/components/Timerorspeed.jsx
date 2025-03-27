import React from "react";
import { useEffect } from "react";

const Timerorspeed = (props) =>{
    const {time,getWPM,timerRunning,setTimerRunning} = props;

    useEffect(() => {
        if (time <= 0 && timerRunning) {
          setTimerRunning(false);
        }
      }, [time, timerRunning, setTimerRunning]);
    
    if(timerRunning){
        return <div className="text-4xl text-white ">{time}</div>
    }else{
        return <div className="text-4xl text-white">WPM : {getWPM()}</div>
    }
}

export default Timerorspeed;