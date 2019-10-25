import React from 'react';
import { withStyles } from '@material-ui/core';
import CustomTextField from './CustomTextField';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    color: {
        color: theme.palette.primary.main,
    },
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

const CustomOutlinedTextField = props => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <CustomTextField
                {...props}
                variant="outlined"
            />
        </MuiThemeProvider>
    )
};

export default withStyles(styles)(CustomOutlinedTextField);