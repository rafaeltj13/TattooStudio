import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';

const Signin = props => {
    return (
        <SigninBackground>
            <Grid item xs={12}>
                <CustomTextField
                    required
                    name={'family'}
                    label={'Username'}
                    field={'fields'}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTextField
                    required
                    name={'family'}
                    label={'Password'}
                    field={'fields'}
                    variant="outlined"
                    type='password'
                />
            </Grid>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <CustomButton variant='contained'>Entrar</CustomButton>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomButton variant='outlined'>Cadastrar-se</CustomButton>
                </Grid>
                <Grid item xs={12}>
                    <CustomButton variant=''>Sou um tatuador</CustomButton>
                </Grid>
                <Grid item xs={12}>
                    <CustomButton variant=''>Tenho um estúdio</CustomButton>
                </Grid>
            </Grid>
        </SigninBackground>)
};

const mapStateToProps = (state) => ({
    test: 1
});

const mapDispatchToProps = (dispatch) => ({
    test: () => { },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: () => {
                return {
                    username: '',
                    password: '',
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    username: Yup.string().required('Campo Required'),
                    password: Yup.string().required('Campo Required')
                }),

            handleSubmit: (values, { props }) => {
                // props.sendLogin(values);
            },
        })(withTheme(Signin))
    )
);