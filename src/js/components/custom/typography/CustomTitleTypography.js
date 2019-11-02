import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        marginTop: '32px',
    }
};

const CustomTitleTypografy = ({ classes, ...props }) => {
    return <Typography {...props} className={classes.root}>{props.children}</Typography>;
};

export default withStyles(styles)(CustomTitleTypografy);