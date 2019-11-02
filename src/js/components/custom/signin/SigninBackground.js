import React from 'react';
import { withStyles } from '@material-ui/core';
import CustomContainer from '../pages/CustomContainer';

import background from '../../../../images/bg.png';

const styles = theme => ({
    background: {
        backgroundColor: '#1A1A1A',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImg: {
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        maxWidth: '750px',
        height: '100vh',
        color: theme.palette.primary.light,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        textAlign: 'center',
    }
});

const SigninBackground = props => (
    <div className={props.classes.background}>
        <div className={props.classes.backgroundImg}>
            <CustomContainer className={props.classes.content}>
                {props.children}
            </CustomContainer>
        </div>
    </div>
)

export default withStyles(styles)((SigninBackground))