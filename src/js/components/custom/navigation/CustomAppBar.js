import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const styles = thisTheme => ({
    root: {
        height: '5vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0rem'
    },
    title: {
        color: thisTheme.palette.primary.light,
        textAlign: 'center'
    },
    menuButton: {
        marginRight: thisTheme.spacing(2),
    },
});

const CustomAppBar = ({ classes, ...props }) => {

    return (
        <AppBar position="static" >
            <Toolbar className={classes.root}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    TattooStudio
                </Typography>
                <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                    <AddIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(CustomAppBar);