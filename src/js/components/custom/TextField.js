import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/index';
import theme from '../../utils/theme';
import PropTypes from 'prop-types';

const styles = thisTheme => ({
    textField: {
        height: '40px',
        width: '100%',
        margin: '10px 0px 10px 0px',
    },
    underline: {
        '&&&&:hover:before': {
            borderBottom: `2px solid ${thisTheme.palette.secondary.main}`,
        },
    },
    helperText: {
        textAlign: 'right',
    },
    disabledInput: {
        color: 'rgba(0, 0, 0, 0.64)',
    },
    disabledLabel: {
        color: 'rgba(0, 0, 0, 0.84) !important',
    },
    input: {
        color: "white"
    }
});

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff'
        },
        secondary: {
            main: '#ffffff'
        },
        typography: {
            color: '#ffffff'
        }
    },
});

const CustomTextField = ({ classes, ...props }) => {
    const { field, name, disabled, underlined, variant } = props;
    return (
        <MuiThemeProvider theme={myTheme}>
            <TextField
                {...props}
                className={props.className ? props.className : classes.textField}
                variant={variant}
                // error={Boolean(field.touched[name] && field.errors[name])}
                // onChange={props.onChange ? props.onChange : field.handleChange}
                // helperText={field.touched[name] && field.errors[name] ? field.errors[name] : ''}
                // InputProps={{
                //     classes: {
                //         underline: !disabled || underlined ? classes.underline : null,
                //         disabled: classes.disabledInput,
                //     },
                // }}
                InputLabelProps={
                    // (field.values[name] && field.values[name].length > 0) || disabled
                    //     ? { classes: { disabled: classes.disabledLabel }, shrink: true }
                    //     : { classes: { disabled: classes.disabledLabel } }
                    {className: classes.input}
                }
                inputProps={{
                    className: props.inputclass ? props.inputclass : classes.input,
                }}
            // FormHelperTextProps={{ classes: { root: classes.helperText } }}
            // value={field.values[name]}
            />
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(CustomTextField)