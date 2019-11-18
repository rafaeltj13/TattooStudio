import React from 'react';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import theme from '../../../utils/theme';

const styles = thisTheme => ({
    root: {
        width: '100%',
    },
});

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.palette.primary.dark
        },
        secondary: {
            main: theme.palette.secondary.light
        }
    },
    typography: theme.typography
});

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

const CustomSearchTab = ({ classes, children, value, handleChange, ...props }) => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    variant="fullWidth"
                    aria-label="full width tabs"
                >
                    <Tab label="Tatuadores" {...a11yProps(0)} />
                    <Tab label="Estúdios" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {children[0]}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {children[1]}
                </TabPanel>
            </div>
        </MuiThemeProvider>
    );
};

export default withStyles(styles)(CustomSearchTab);