import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    button: {
        height: theme.palette.button.height,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '5px 0px 10px 0px'
    },
});

const CustomButton = ({ classes, variant, ...props }) => (
    <Button {...props} variant={variant} className={classes.button} size="small"/>
);


export default withStyles(styles)(CustomButton);