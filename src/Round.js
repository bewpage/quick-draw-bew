import React, {useContext } from "react";
import { Canvas } from "./Canvas";
import Prediction from "./Prediction";
import Controls from './Controls';
// import TimerClass from './TimerClass';
import TimerHookStates from './TimerHookStates';
// import TimerHookReducer from './TimerHookReducer';
// import TimerHookStopper from './TimerHookStopper';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { GameContext } from './App';
import { RoundContext } from './Game';


const styles = ({
    grow: {
        flexGrow: 1,
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: '0 -5px'
    },
    timerItems: {
        margin: '0 5px'
    }
});

const Round = ({ classes, nextRound }) => {
    const { ref, labels, question, duration, showNextRound } = useContext(RoundContext);
    const { model } = useContext(GameContext);

    return (
        <>
        <Grid
            container
            spacing={16}
        >
            <Grid item xs>
                <Canvas ref={ref} />
            </Grid>
            <Grid item container xs >
                <Prediction theCanvas={ref} model={model} labels={labels} question={question} />
                {/*<Timer*/}
                    {/*duration={duration}*/}
                    {/*showNextRound={nextRound}*/}
                {/*/>*/}
                <Grid item xs className={classes.border}>
                    <Typography variant='subtitle1'>
                        <div style={{textAlign: 'right'}}>
                            <p>Time left:</p>
                            {/* ------ timer react class component version ------ */}
                            {/*<div className={classes.timerContainer}>*/}
                            {/*    <div className={classes.timerItems}>Count down class component:</div>*/}
                            {/*    <TimerClass className={classes.timerItems} duration={duration} showNextRound={nextRound}/>*/}
                            {/*</div>*/}
                            {/* ------ timer hook with states version ------ */}
                            <div className={classes.timerContainer}>
                                <div className={classes.timerItems}>Count down hook+states:</div>
                                <TimerHookStates duration={duration} showNextRound={nextRound}/>
                            </div>
                            {/* ------ timer hook with reducer version ------ */}
                            {/*<div className={classes.timerContainer}>*/}
                                {/*<div className={classes.timerItems}>Count down hook+reducer:</div>*/}
                                {/*<TimerHookReducer duration={duration} showNextRound={nextRound}/>*/}
                            {/*</div>*/}
                            {/* ------ stopper version ------ */}
                            {/*<div className={classes.timerContainer}>*/}
                            {/*    <div className={classes.timerItems}><span>Stopper hook:</span></div>*/}
                            {/*    <TimerHookStopper className={classes.timerItems} duration={duration} showNextRound={nextRound}/>*/}
                            {/*</div>*/}
                        </div>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid
            className={classes.grow}
            container
            spacing={16}
        >
            <Controls theCanvas={ref} model={model} labels={labels} showNextRound={showNextRound} />
        </Grid>
        </>
    )

};


export default withStyles(styles)(Round);
