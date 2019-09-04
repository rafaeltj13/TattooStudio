import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import { signinCostumerRequest } from '../../actions/signin-actions'
import Grid from '@material-ui/core/Grid';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';

const Signin = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, handleChange, values, loading, error, signinCostumer } = props;

    return (
        <SigninBackground>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <CustomTextField
                        required
                        name={'username'}
                        label={'Usuário'}
                        field={fields}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextField
                        required
                        name={'family'}
                        label={'Senha'}
                        field={fields}
                        variant="outlined"
                        type='password'
                    />
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <CustomButton variant='outlined'>Cadastrar-se</CustomButton>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomButton variant='contained' size="small">Entrar</CustomButton>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomButton variant=''>Sou um tatuador</CustomButton>
                        <CustomButton variant=''>Tenho um estúdio</CustomButton>
                    </Grid>
                </Grid>
            </Grid>
        </SigninBackground>)
};

const mapStateToProps = ({ signin }) => ({
    logged: signin.logged,
    loading: signin.loading,
    error: signin.error,
    type: signin.type
});

const mapDispatchToProps = (dispatch) => ({
    signinCostumer: (signinInput, typeInput) => signinCostumerRequest(signinInput, typeInput),
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
                props.signinCostumer(values, props.type);
            },
        })(withTheme(Signin))
    )
);