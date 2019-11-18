import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: '100%'
    }
};

const CustomContainerInline = ({ classes, ...props }) => {
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
};

export default withStyles(styles)(CustomContainerInline)