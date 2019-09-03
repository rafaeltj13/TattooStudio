import React from 'react';
import { withStyles } from '@material-ui/core';

import background from '../../../../images/bg.png';

const styles = theme => ({
    background: {
        backgroundColor: '#1A1A1A',
        position: 'relative'
    },
    backgroundImg: {
        backgroundImage: `url(${background})`,
        height: '100vh',
        maxWidth: '750px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: theme.palette.secondary.main,
        margin: 'auto',
    }
});

const SigninBackground = props => (
    <div className={props.classes.background}>
        <div className={props.classes.backgroundImg}>
            {props.children}
        </div>
    </div>
)

export default withStyles(styles)((SigninBackground))