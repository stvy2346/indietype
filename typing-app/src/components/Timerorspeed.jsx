import React from "react";

const Timerorspeed = (props) =>{
    const {time,setTime,startTimer} = props;
    
    return(
        <div className="text-4xl text-white px-20 mb-4">
            {time}
        </div>
    )
}

export default Timerorspeed;