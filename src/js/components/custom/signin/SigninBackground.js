import React from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import background from '../../../../images/bg.png';
import TextField from '../TextField';

const styles = theme => ({
    backgroundImg: {
        backgroundImage: `url(${background})`,
        height: '100vh',
        maxWidth: '750px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        // backgroundColor: '#000000',
        color: '#ffffff',
        textAlign: 'center'
    }
});

const SigninBackground = props => (
    <div className={props.classes.backgroundImg}>
        <Grid container>
            <Grid item xs={12}>
                <TextField
                    required
                    name={'family'}
                    label={'Username'}
                    field={'fields'}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    name={'family'}
                    label={'Password'}
                    field={'fields'}
                    variant="outlined"
                />
            </Grid>
        </Grid>
    </div>
)

export default withStyles(styles)((SigninBackground))