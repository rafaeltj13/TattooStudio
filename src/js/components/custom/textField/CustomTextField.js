import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    textField: {
        height: '40px',
        width: '100%',
        margin: '20px 0px',
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
        color: "black",
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
        }
    },
    typography: theme.typography
});

const CustomTextField = ({ classes, classStyle, ...props }) => {
    const { field, name, disabled, value } = props;

    return (
        <MuiThemeProvider theme={myTheme}>
            <TextField
                {...props}
                className={props.className ? props.className : classes.textField}
                error={Boolean(field.touched[name] && field.errors[name])}
                onChange={props.onChange ? props.onChange : field.handleChange}
                helperText={field.touched[name] && field.errors[name] ? field.errors[name] : ''}
                InputProps={{
                    ...props.InputProps,
                    classes: {
                        root: classStyle ? classStyle.root : classes.input,
                        input: classStyle ? classStyle.input : classes.input,
                        disabled: classes.disabledInput,

                    },
                }}
                InputLabelProps={
                    (field.values[name] && field.values[name].length > 0) || disabled
                        ? { classes: { root: classes.input, disabled: classes.disabledLabel }, shrink: true, ...props.InputLabelProps }
                        : { classes: { root: classes.input, disabled: classes.disabledLabel } , ...props.InputLabelProps }
                }
                FormHelperTextProps={{ classes: { root: classes.helperText } }}
                value={value ? value : field.values[name]}
            />
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(CustomTextField);