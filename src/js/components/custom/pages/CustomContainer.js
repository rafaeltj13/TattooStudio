import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = {
    root: {
        padding: '1.5rem'
    }
};

const CustomContainer = ({ classes, ...props }) => {
    return (
        <Container className={classes.root}>
            <div>
                {props.children}
            </div>
        </Container>
    );
};

export default withStyles(styles)(CustomContainer)