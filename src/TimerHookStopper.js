import React, { useState, useEffect } from 'react';


const TimerHookStopper = ({ duration, showNextRound}) => {
    const [stopper] = useStopper(duration, showNextRound);

    return (
        <div>{stopper}</div>
    )
};

const useStopper = (durationTotal, callback) => {
    const [counter, setCounter] = useState(0);

    let min = Math.floor(counter / 60);
    let sec = counter - (min * 60);

    let minTotal = Math.floor(durationTotal / 60);
    let secTotal = durationTotal - (minTotal * 60);

    useEffect(() => {
        const tick = setInterval(() => {
            setCounter(counter + 1)
        }, 1000);
        if(min === minTotal && sec === secTotal){
            clearInterval(tick);
            return callback();
        }
        return () => clearInterval(tick);
    });

    const stopper = (
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
    return [stopper]
};

export default TimerHookStopper;