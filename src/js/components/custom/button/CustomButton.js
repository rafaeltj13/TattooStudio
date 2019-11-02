import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
    button: {
        height: theme.palette.button.height,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '12px',
        margin: '10px 0px 10px 10px',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
    },
    width: {
        width: '100%',
        margin: '10px 0px',
    }
});

const CustomButton = ({ classes, variant, width, ...props }) => (
    <Button {...props} variant={variant} className={width ? classNames(classes.button, classes.width) : classes.button} size="small"/>
);


export default withStyles(styles)(CustomButton);