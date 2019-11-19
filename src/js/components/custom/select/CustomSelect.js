import React from 'react';
import { createMuiTheme, MenuItem, MuiThemeProvider, withStyles } from '@material-ui/core';
import theme from '../../../utils/theme';
import CustomTextField from '../textField/CustomTextField';
import CustomOutlinedTextField from '../textField/CustomOutlinedTextField';
import FormControl from '@material-ui/core/FormControl/index';

const styles = {
  formControl: {
    height: '40px',
    width: '100%',
  },
  helperText: {
    textAlign: 'right',
  },
  disabledInput: {
    color: 'rgba(0, 0, 0, 0.64)',
    '&::before': {
      borderBottomStyle: 'solid !important',
    },
  },
  disabledLabel: {
    color: `${theme.palette.secondary.main} !important`,
  },
};

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: theme.palette.secondary.main,
      dark: theme.palette.secondary.main,
    },
  },
});

const CustomSelect = ({ classes, ...props }) => {
  const { field, name, required, optionsmap, variant } = props;

  const TextField = variant === 'outlined' ? CustomOutlinedTextField : CustomTextField;

  return (
    <MuiThemeProvider theme={myTheme}>
      <FormControl
        className={classes.formControl}
        required={required}
        error={Boolean(field.touched[name] && field.errors[name])}
      >
        <TextField
          {...props}
          select
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText={field.touched[name] && field.errors[name] ? field.errors[name] : ''}
        >
          <MenuItem key={`-1${name}`} value="-1" disabled>
            <em>{props.optionmessage}</em>
          </MenuItem>
          {optionsmap.map(({ optionLabel, code, customLabel }) => (
            <MenuItem key={`${code}_${optionLabel}`} value={`${code}`}>
              {customLabel || optionLabel}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(CustomSelect);