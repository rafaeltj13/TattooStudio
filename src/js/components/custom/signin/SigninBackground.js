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
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        maxWidth: '750px',
        color: theme.palette.secondary.main,
        textAlign: 'right'
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