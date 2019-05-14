import React, { Component } from 'react';
import { Grid, Typography, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import quickDrawScreen150 from './images/quick_draw_screen_150.png';

const styles = (theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            margin: `0 ${theme.spacing.unit * 40}px`,
        },
        flexGrow: 1,
        paddingTop: 70,
    },
    title: {
        textAlign: 'center'
    },
    cover: {
        width: 150,
        height: 150
    }
});

class Home extends Component{


    render(){
        const { classes } = this.props;
        return (

            <div className={classes.root}>
                <Typography
                    className={classes.title}
                    variant='h4'
                >
                    Hi!
                </Typography>
                <Grid container
                      spacing={16}
                      direction='row'
                      alignItems='center'
                      justify='center'
                >
                    <Grid item xs sm={6} md>
                        <CardMedia
                            className={classes.cover}
                            image={quickDrawScreen150}
                            title='Quick Draw Screen'
                        />
                    </Grid>
                    <Grid item xs sm={6} zeroMinWidth>
                        <Typography variant='subtitle1'>
                            This game has been modeled-off <span>'Google's Quick'</span>, Draw! game, and uses a sampling from 'Quick, Draw!' dataset.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}


export default withStyles(styles)(Home);