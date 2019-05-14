import React, { useEffect, useReducer } from 'react';


const TimerHookReducer = ({ duration, showNextRound}) => {
    const [timer] = useTimerCountDownReducer(duration, showNextRound);

    return (
        <div>{timer}</div>
    )
};


const timerReducer = (state, action) => {
    switch (action.type) {
        case 'duration':
            let { duration } = action;
            return {
                ...state,
                duration,
            };
        default:
            return state;
    }
};

const useTimerCountDownReducer = (durationTotal, callback) => {
    const [state, dispatch] = useReducer(timerReducer, {duration: durationTotal});
    const { duration } = state;

    let min = Math.floor(duration / 60);
    let sec = duration - (min * 60);

    useEffect(() => {
        const tick = setInterval(() => {
            dispatch({type: 'duration', duration: duration - 1})
        }, 1000);
        if(min === 0 && sec === 0){
            clearInterval(tick);
            return callback();
        }
        return () => clearInterval(tick);
    });


    const timerCountDown = (
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

    return [timerCountDown];
};

export default TimerHookReducer;