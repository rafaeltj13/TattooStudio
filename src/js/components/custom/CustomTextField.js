import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField/index';

const styles = thisTheme => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'green',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
    textField: {
        height: '40px',
        width: '90%',
        margin: '20px 0px 20px 0px',
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
        color: "white",
        textAlign: 'left'
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
    const { field, name, disabled, underlined } = props;
    return (
        <MuiThemeProvider theme={myTheme}>
            <TextField
                {...props}
                className={props.className ? props.className : classes.textField}
                error={Boolean(field.touched[name] && field.errors[name])}
                onChange={props.onChange ? props.onChange : field.handleChange}
                helperText={field.touched[name] && field.errors[name] ? field.errors[name] : ''}
                InputProps={{
                    classes: {
                        root: classes.input,
                        input: classes.input,
                        disabled: classes.disabledInput,
                    },
                }}
                InputLabelProps={
                    (field.values[name] && field.values[name].length > 0) || disabled
                        ? { classes: { root: classes.input, disabled: classes.disabledLabel }, shrink: true }
                        : { classes: { root: classes.input, disabled: classes.disabledLabel } }
                }
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                value={field.values[name]}
            />
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(CustomTextField)