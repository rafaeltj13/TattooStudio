import { createMuiTheme } from '@material-ui/core/styles';

export const themeOptions = {
    palette: {
        primary: {
            light: '#ffffff',
            main: '#ffffff',
            dark: '#000000',
            contrastText: '#707070',
        },
        secondary: {
            light: '#4dabf5',
            main: '#000000',
            dark: '#1769aa',
            contrastText: '#ffffff',
        },
        lines: {
            divider: '#e4e4e4',
        },
        error: {
            main: '#b3001b',
        },
        button: {
            height: '40px',
            width: '110px',
            padding: '15px',
        },
    },
    typography: {
        fontFamily: 'Trebuchet MS',
        fontSize: 12,
        fontStyle: 'normal',
        color: '#ffffff'
    }
};

const theme = createMuiTheme(themeOptions);

export default theme;
