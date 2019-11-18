import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import theme from '../../../utils/theme';

const styles = {
    root: {
        backgroundColor: 'transparent',
    },
    textColor: {
        '& span': {
            color: theme.palette.primary.light,
        }
    }
};

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.palette.primary.light
        },
        secondary: {
            main: theme.palette.primary.dark
        }
    },
    typography: {
        ...theme.typography,
        color: theme.palette.primary.light,
    }
});


const CustomStepper = ({ classes, activeStep, steps, ...props }) => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <Stepper className={classes.root} activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel className={classes.textColor}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(CustomStepper)