import React, { useContext, useReducer } from "react";
import { Link, withRouter } from "react-router-dom";
import Round from "./Round";
import HeaderGame from "./HeaderGame";
import { GameContext } from './App';

import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Drawer, Button } from '@material-ui/core';
import { yellow, grey } from '@material-ui/core/colors';




const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 70
    },
    paper: {
        padding: theme.spacing.unit * 1.5,
        margin: 'auto',
        maxWidth: 1000,
        height: 500,
        background: grey[300],
    },
    button: {
        padding: theme.spacing.unit,
        marginRight: theme.spacing.unit * 2,
    },
    buttonCard: {
        margin: 20
    },
    drawerPaper: {
        height: '100%',
        backgroundColor: yellow[500],
    },
    textQuestion: {
        fontSize: '1.2em',
        fontWeight: 500
    },
    textCardContainer: {
        direction: 'column',
        paddingTop: '20%',
    },
    textCardItem: {
        textAlign: 'center',
    },
    cards: {
        display: 'block'
    },
    visible: {
      top: 0,
      left: 0
    },
    coverCard: {
        position: 'absolute',
        zIndex: 100,
        width: '100%',
        height: '100%',
        backgroundColor: yellow[500],
    },
    fill: {
        height: '100%'
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%',
        maxWidth: 910,
        margin: '0 auto'
    },
    cardHeadline: {
        paddingTop: 100,
        paddingBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 18
    },
    cardRow: {
        maxWidth: 'calc(100% - 40px)',
        padding: '300px 40px'
    },
});


const RoundContext = React.createContext({});
let ref = React.createRef();
const {
    initialRounds,
    duration,
    labels,
    questions
} = require('./gameSettings');


const Game = ({ classes }) => {
    const [rounds, roundsToGo, question, showNextRound, showNewGame] = useRounds(initialRounds, questions, classes);
    const { points, dispatchPoints } = useContext(GameContext);

    const gamePlay = (
      <>
          {rounds}
      </>
    );

    const MyHomeLink = props => {
        return <Link to='/' {...props} />
    };

    const playAgain = (
        <Grid
            container
            spacing={16}
            direction='column'
            alignItems='center'
            justify='center'
        >
            <Grid item xs>
                <Typography variant='h5'>{points >= initialRounds / 2 ? 'You Win!' : 'Sorry, You Lost.'}</Typography>
                <Typography variant='h6'>Your score: {points}/{initialRounds}</Typography>
            </Grid>
            <Grid item xs>
                <Button
                    variant='contained'
                    color='default'
                    size='medium'
                    className={classes.button}
                    onClick={() => {
                        dispatchPoints({type: 'reset'});
                        showNewGame();
                    }}
                >
                    Play again
                </Button>
                <Button
                    variant='contained'
                    color='default'
                    size='medium'
                    className={classes.button}
                    component={MyHomeLink}
                    onClick={() => dispatchPoints({type: 'reset'})}
                >
                    Back home
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <RoundContext.Provider value={{ ref, labels, question, initialRounds, showNextRound, duration }}>
            <div>
                <HeaderGame/>
                <div className={classes.root}>
                    <Paper square className={classes.paper}>
                        {roundsToGo !== 0 ? gamePlay : playAgain}
                    </Paper>
                </div>
            </div>
        </RoundContext.Provider>
    )

};


const initState = {
    index: 0,
    newRound: false,
    drawer: true
};

const roundsReducer = (state, action) => {
    switch (action.type) {
        case 'index':
            return {
                ...state,
                index: action.index
            };
        case 'new_round':
            return {
                ...state,
                newRound: action.newRound
            };
        case 'drawer':
            return {
                ...state,
                drawer: action.drawer
            };
        default:
            return state;
    }
};


const useRounds = (initialCount, array, classes) => {
    const [state, dispatch] = useReducer(roundsReducer, initState);

    const questions = array.map(item => {
        return item
    });
    const question = questions[state.index];
    const roundsToGo = initialCount - state.index;

    const startNewRound = () => {
        return state.newRound ?
            dispatch({type: 'new_round', newRound: false}) :
            dispatch({type: 'new_round', newRound: true});
    };


    const nextChallengeCard = (
        <div>
            <Drawer
                open={state.drawer}
                transitionDuration={1000}
                anchor='top'
                classes={{paper: classes.drawerPaper}}
            >
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    justify='center'
                >
                    <Grid item>
                        <Typography variant='h6'>
                            Drawing {state.index + 1}/{initialCount}
                        </Typography>

                    </Grid>
                    <Grid
                        item
                        container
                        direction='column'
                        className={classes.textCardContainer}
                    >
                        <Grid
                            item
                            className={classes.textCardItem}
                        >
                            <Typography variant='h5'>
                                <span>Draw</span>
                                <br/>
                                <div className={classes.textQuestion}>
                                    <span style={{textTransform: 'uppercase'}}>
                                        {question}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        in under 20 seconds
                                    </span>
                                </div>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                            id='test'
                            className={classes.buttonCard}
                            variant='contained'
                            color='default'
                            size='medium'
                            onClick={() => {startNewRound()}}
                        >
                            Got It!
                        </Button>

                    </Grid>
                </Grid>
            </Drawer>
        </div>
    );

    const newGame = () => {
        dispatch({type: 'index', index: initState.index})
    };


    const nextRound = () => {
        dispatch({type: 'index', index: state.index + 1});
        dispatch({type: 'new_round', newRound: false});
        dispatch({type: 'drawer', drawer: true});
    };

    const rounds = state.newRound ?
        <Round
            nextRound={nextRound}
        />
        : nextChallengeCard;

    return [rounds, roundsToGo, question, () => nextRound(), () => newGame()];
};

export default withStyles(styles)(withRouter(Game));
export { RoundContext };
