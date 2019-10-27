import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const CustomChip = ({ classes, label, ...props }) => {
    return <Chip {...props} label={label} color="secondary"/>;
};

export default withTheme(CustomChip);