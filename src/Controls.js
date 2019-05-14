import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    button: {
       margin: theme.spacing.unit,
   },
    routerLink: {
        textDecoration: "none",
    }
});

const Controls = ({ theCanvas, model, labels, classes, showNextRound }) => {

    return (
            <Grid item xs>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                           const canvas = theCanvas.current;
                           const ctx = canvas.getContext("2d");
                           ctx.fillRect(0, 0, canvas.height, canvas.width);
                    }}
                >
                    Clean
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => showNextRound()}
                >
                    Next
                </Button>
            </Grid>
    );
};

export default withStyles(styles)(Controls) ;