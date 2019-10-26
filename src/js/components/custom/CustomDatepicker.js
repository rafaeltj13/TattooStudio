import 'date-fns';
import React, { useEffect } from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core';
import theme from '../../utils/theme';

const styles = () => ({
    datepicker: {
        width: '100%'
    }
});

const myTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.palette.primary.dark
        },
    },
    typography: theme.typography
});

const CustomDatepicker = ({ classes, ...props }) => {
    const { field, name, label, disabled } = props;

    const [selectedDate, setSelectedDate] = React.useState(field.values[name]);

    useEffect(
        () => {
            if(!selectedDate) setSelectedDate(new Date());
        },
        [selectedDate],
    );

    const handleDateChange = date => {
        field.values[name] = date;
        setSelectedDate(date);
    };

    return (
        <MuiThemeProvider theme={myTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={props.className ? props.className : classes.datepicker}
                    id="date-picker-dialog"
                    label={label}
                    format="dd/MM/yyyy"
                    value={field.values[name]}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    disabled={disabled}
                    minDate={new Date()}
                />
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    );
}


export default withStyles(styles)(CustomDatepicker);