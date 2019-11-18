import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        width: '100%',
        height: 65
    }
};

const CustomInlineFields = ({ classes, ...props }) => {
    const xs = 12 / props.children.length;

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {props.children.map((element, index) => (
                    <Grid item xs={xs} key={index}>
                        {element}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default withStyles(styles)(CustomInlineFields)