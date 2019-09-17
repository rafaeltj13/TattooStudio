import React from 'react';
import { withStyles } from '@material-ui/core';

import background from '../../../../images/bg.png';

const styles = theme => ({
    background: {
        backgroundColor: '#1A1A1A',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImg: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        maxWidth: '750px',
        color: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    content: {
        padding: '1rem',
        textAlign: 'center'
    }
});

const SigninBackground = props => (
    <div className={props.classes.background}>
        <div className={props.classes.backgroundImg}>
            <div className={props.classes.content}>
                {props.children}
            </div>
        </div>
    </div>
)

export default withStyles(styles)((SigninBackground))