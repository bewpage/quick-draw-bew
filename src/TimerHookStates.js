import React, { useState, useEffect } from 'react';


const TimerHookStates = ({ duration, showNextRound }) => {
    const [timer] = useTimerCountDownStates(duration, showNextRound);

    return (
        <div>
            <>{timer}</>
        </div>
    )
};


const useTimerCountDownStates = (durationTotal, callback) => {
    const [duration, setDuration] = useState(durationTotal);

    let min = Math.floor(duration / 60);
    let sec = duration - (min * 60);

    useEffect(() => {
        const tick = setInterval(() => {
            setDuration(duration - 1);
        }, 1000);
        if(duration === 0){
            clearInterval(tick);
            return callback();
        }
        return () => clearInterval(tick);
    }, [duration]);


    const timer = (
        <div>
            <span>
                {min < 10 ? '0' + min : min}
            </span>
            :
            <span>
                {sec < 10 ? '0' + sec : sec}
            </span>
        </div>
    );

    return [timer];
};

export default TimerHookStates;