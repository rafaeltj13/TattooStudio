import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import { signinCostumerRequest, changeSigninType } from '../../actions/signin-actions'
import { createNotification } from '../../actions/notification-actions';
import Grid from '@material-ui/core/Grid';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';

const Signin = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, newNotification, newSigninType, loading, error, type } = props;

    useEffect(
        () => {
            if (!loading && isSubmitting) {
                setSubmitting(false);
                if (error) {
                    newNotification({
                        variant: 'error',
                        message: error
                    });
                } else {
                    newNotification({
                        variant: 'success',
                        message: 'Sucesso'
                    })
                    props.history.push('/signup/customer');
                }
            }
        },
        [loading],
    );

    const renderOptions = () => {
        if (type === 'Customer') {
            return (
                <Grid item xs={12}>
                    <CustomButton variant='text' onClick={() => newSigninType('Artist')}>Sou um tatuador</CustomButton>
                    <CustomButton variant='text' onClick={() => newSigninType('Owner')}>Tenho um estúdio</CustomButton>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12}>
                    <CustomButton variant='text' onClick={() => newSigninType('Customer')}>Voltar</CustomButton>
                </Grid>
            );
        }
    };

    return (
        <SigninBackground>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <CustomTextField
                    required
                    name={'username'}
                    label={'Usuário'}
                    field={fields}
                    variant="outlined"
                />
                <CustomTextField
                    required
                    name={'password'}
                    label={'Senha'}
                    field={fields}
                    variant="outlined"
                    type='password'
                />
                <Grid container>
                    <Grid item xs={6}>
                        <CustomButton variant='outlined'>Cadastrar-se</CustomButton>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomButton variant='contained' size="small" onClick={handleSubmit}>Entrar</CustomButton>
                    </Grid>
                    {renderOptions()}
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

const mapDispatchToProps = dispatch => ({
    signinCostumer: (signinInput, typeInput) => dispatch(signinCostumerRequest(signinInput, typeInput)),
    newSigninType: newType => dispatch(changeSigninType(newType)),
    newNotification: payload => dispatch(createNotification(payload))
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
                    username: Yup.string().required('Campo obrigatório'),
                    password: Yup.string().required('Campo obrigatório')
                }),

            handleSubmit: (values, { props }) => {
                console.log(values)
                props.signinCostumer(values, props.type);
            },
        })(withTheme(Signin))
    )
);