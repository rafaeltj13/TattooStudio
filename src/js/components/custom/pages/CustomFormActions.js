import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        textAlign: 'right'
    }
};

const CustomFormActions = ({ classes, ...props }) => {
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
};

export default withStyles(styles)(CustomFormActions)