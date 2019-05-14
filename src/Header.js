import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Button,
    Typography
} from '@material-ui/core';


const styles = ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    routerLink: {
        textDecoration: "none",
    }
});



const Header = ({classes, match, location}) => {
    const [renderButtons] = useRenderButtons(match, location);

    return (
        location.pathname === '/game' ? null : <div className={classes.root}>
            <AppBar
                position="fixed"
                color='default'
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.grow}
                    >
                        Draw'a'Picture
                    </Typography>
                    {renderButtons}
                </Toolbar>
            </AppBar>
        </div>
    )
};

const useRenderButtons = () => {

    const MyAppLink = props => {
        return <Link to='/game' {...props}/>
    };

    const renderButtons = (
        <Button
            variant='contained'
            component={MyAppLink}
        >
            Start Game
        </Button>
    );

    return [renderButtons]
};


export default withStyles(styles)(withRouter(Header));