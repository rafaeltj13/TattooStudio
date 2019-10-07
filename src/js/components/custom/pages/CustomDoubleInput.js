import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { height } from '@material-ui/system';

const styles = {
    root: {
        width: '100%',
        height: 65
    }
};

const CustomDoubleInput = ({ classes, ...props }) => {
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {props.children[0]}
                </Grid>
                <Grid item xs={6}>
                    {props.children[1]}
                </Grid>
            </Grid>
        </div>
    );
};

export default withStyles(styles)(CustomDoubleInput)