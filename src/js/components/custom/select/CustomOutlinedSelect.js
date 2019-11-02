import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import CustomSelect from './CustomSelect';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    root: {
        '& select:valid + fieldset': {
            borderColor: theme.palette.primary.light,
            borderWidth: 2,
        },
        '& select:invalid + fieldset': {
            borderColor: theme.palette.primary.light,
            borderWidth: 2,
        },
        '& label:valid + fieldset': {
            borderColor: theme.palette.primary.light,
        },
        '& label:invalid + fieldset': {
            borderColor: theme.palette.primary.light,
        },
        color: theme.palette.primary.light,
        textColor: theme.palette.primary.light,
    },
    input: {
        color: theme.palette.primary.light,
        textAlign: 'left'
    },
    floatingLabelFocusStyle: {
        color: theme.palette.primary.light,
    }
});

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.palette.primary.light
        },
        secondary: {
            main: theme.palette.secondary.light
        }
    },
    typography: theme.typography
});

const CustomOutlinedSelectField = ({ classes, ...props }) => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <CustomSelect
                {...props}
                classStyle={{ input: classes.input, root: classes.root }}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                variant="outlined"
                InputProps={{
                    ...props.InputProps,
                    classes: {
                        root: classes.input,
                        input: classes.input,
                        disabled: classes.disabledInput,

                    },
                }}
            />
        </MuiThemeProvider>
    )
};

export default withStyles(styles)(CustomOutlinedSelectField);