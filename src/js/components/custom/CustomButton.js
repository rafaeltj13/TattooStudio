import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    button: {
        height: theme.palette.button.height,
        width: '100%',
        fontWeight: 'bold',
        margin: '5px 0px 5px 0px',
    },
});

const CustomButton = ({ classes, variant, ...props }) => (
    <Button {...props} variant={variant} className={classes.button} color="default" />
);


export default withStyles(styles)(CustomButton);