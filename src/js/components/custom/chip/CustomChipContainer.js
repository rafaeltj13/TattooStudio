import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import theme from '../../../utils/theme';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    }
};

const CustomChipContainer = ({ classes, ...props }) => {
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
};

export default withStyles(styles)(CustomChipContainer);