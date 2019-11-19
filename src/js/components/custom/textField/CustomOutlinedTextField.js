import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import CustomTextField from './CustomTextField';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    root: {
        '& input:valid + fieldset': {
            borderColor: theme.palette.primary.light,
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
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

const CustomOutlinedTextField = ({ classes, ...props }) => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <CustomTextField
                {...props}
                classStyle={{ input: classes.input, root: classes.root }}
                InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                }}
                variant="outlined"
            />
        </MuiThemeProvider>
    )
};

export default withStyles(styles)(CustomOutlinedTextField);