import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import { signinCostumerRequest, changeSigninType } from '../../actions/signin-actions'
import { createNotification } from '../../actions/notification-actions';
import { SIGNIN, GENERAL } from '../../utils/constants';
import LinkUi from '@material-ui/core/Link';
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
                        message: GENERAL.SUCCESS_MESSAGE
                    })
                    props.history.push('/home');
                }
            }
        },
        [loading],
    );

    const renderOptions = () => {
        if (type === 'Customer') {
            return (
                <div>
                    <div>
                        <LinkUi component="button" variant="body2" onClick={() => newSigninType('Artist')}>Sou um tatuador</LinkUi>
                    </div>
                    <div>
                        <LinkUi component="button" variant="body2" onClick={() => newSigninType('Owner')}>Tenho um estúdio</LinkUi>
                    </div>
                </div>
            );
        } else {
            return (
                <LinkUi variant='text' onClick={() => newSigninType('Customer')}>Voltar</LinkUi>
            );
        }
    };

    return (
        <SigninBackground>
            <CustomTextField
                required
                name={'username'}
                label={SIGNIN.USER}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                required
                name={'password'}
                label={SIGNIN.PASSWORD}
                field={fields}
                variant="outlined"
                type='password'
            />
            <CustomButton variant='outlined' component={Link} to={`/signup/${type}`}>Cadastrar-se</CustomButton>
            <CustomButton variant='contained' size="small" onClick={handleSubmit}>Entrar</CustomButton>
            {renderOptions()}
        </SigninBackground >)
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
                    username: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    password: Yup.string().required(GENERAL.REQUIRED_FIELD)
                }),

            handleSubmit: (values, { props }) => {
                props.signinCostumer(values, props.type);
            },
        })(withTheme(Signin))
    )
);