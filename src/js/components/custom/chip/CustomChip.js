import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const CustomChip = ({ classes, label, ...props }) => {
    return <Chip {...props} label={label} color="secondary"/>;
};

export default withTheme(CustomChip);