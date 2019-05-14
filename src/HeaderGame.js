import React, {useContext} from 'react';
import { Link, withRouter } from "react-router-dom";
import { GameContext } from './App';
import { RoundContext } from './Game';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';


const styles = ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    growMiddle: {
        flexGrow: 2,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    routerLink: {
        textDecoration: "none",
    }
});

const HeaderGame = ({ classes }) => {
    const { points, dispatchPoints } = useContext(GameContext);
    const { question, initialRounds } = useContext(RoundContext);
    const [renderGameButtons] = useGameButtons(dispatchPoints);



  return (
      <div>
          <AppBar
              position="fixed"
              color='default'
          >
              <Toolbar>
                  <Typography
                      variant='h6'
                      className={classes.grow}
                  >
                      Draw: <span style={{textTransform: 'uppercase'}}>{question}</span>
                  </Typography>
                  <Typography
                      variant='h6'
                      className={classes.grow}
                  >Score: {points}/{initialRounds}</Typography>
                  {renderGameButtons}
              </Toolbar>
          </AppBar>
      </div>
  )
};


const useGameButtons = (dispatchPoints) => {
    const MyGameLinks = props => {
        return  <Link to='/' {...props}/>;
    };

    const renderGameButtons = (
        <Button
            variant='contained'
            color='default'
            component={MyGameLinks}
            onClick={() => dispatchPoints({type: 'reset'})}
        >
            Home
        </Button>
    );

    return [renderGameButtons];

};

export default withStyles(styles)(withRouter(HeaderGame));