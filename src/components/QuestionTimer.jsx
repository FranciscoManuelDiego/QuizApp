
import { useState, useEffect } from "react";
export default function QuestionTimer({ timeout ,onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    //To prevent subsequente renders.
    useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    //Here we need to unmount the interval when the component unmounts to prevent memory leaks.
    return()  => {
        clearTimeout(timer);
    }
    }, [onTimeout, timeout]); //If one of these values changes, the effect will run again.

    useEffect(() => {
    const interval = setInterval(() => {setRemainingTime(prevRemaingTime => prevRemaingTime - 85)}, 85)
    //Here we need to unmount the interval when the component unmounts to prevent memory leaks.
    return () => {
      if(remainingTime === 0) {
      clearInterval(interval);
      }
    };
    }, []);
    
  return (
    <progress
      id="question-time"
      value={remainingTime}
      max={timeout}
      style={{ width: "100%", height: "20px" }}
    />
  );
}