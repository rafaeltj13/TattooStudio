import React from 'react';
import { createMuiTheme, MenuItem, MuiThemeProvider, withStyles } from '@material-ui/core';
import theme from '../../utils/theme';
import CustomTextField from './CustomTextField';
import FormControl from '@material-ui/core/FormControl/index';

const styles = {
  formControl: {
    height: '40px',
    width: '100%',
  },
  // underline: {
  //   '&&&&:hover:before': {
  //     borderBottom: `2px solid ${theme.palette.secondary.main}`,
  //   },
  //   textAlign: 'left'
  // },
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
  const { field, name, required, optionsmap, disabled } = props;

  return (
    <MuiThemeProvider theme={myTheme}>
      <FormControl
        className={classes.formControl}
        required={required}
        error={Boolean(field.touched[name] && field.errors[name])}
      >
        <CustomTextField
          select
          {...props}
          // classes={{
          //   underline: !disabled ? classes.underline : null,
          // }}
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
        </CustomTextField>
      </FormControl>
    </MuiThemeProvider>
  );
};

export default withStyles(styles)(CustomSelect);