import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../../utils/theme';

const styles = {
    root: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }
};

const CustomTypografy = ({ classes, ...props }) => {
    return <div className={classes.root}>{props.children}</div>;
};

export default withStyles(styles)(CustomTypografy);