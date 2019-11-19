import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { signinRequest, changeSigninType } from '../../actions/signin-actions'
import { createNotification } from '../../actions/notification-actions';
import { SIGNIN, GENERAL, USER_TYPES } from '../../utils/constants';
import LinkUi from '@material-ui/core/Link';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/textField/CustomOutlinedTextField';
import CustomButton from '../custom/button/CustomButton';
import CustomFormActions from '../custom/pages/CustomFormActions';

const Signin = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, newNotification, newSigninType, loading, error, type } = props;

    useEffect(
        () => {
            newSigninType('customer')
        },
        []
    )

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
                    props.history.push('/');
                }
            }
        },
        [loading],
    );

    const renderOptions = () => {
        if (type === USER_TYPES.CUSTOMER) {
            return (
                <div>
                    <div>
                        <LinkUi component="button" variant="body2" onClick={() => newSigninType('artist')}>Sou um tatuador</LinkUi>
                    </div>
                    <div>
                        <LinkUi component="button" variant="body2" onClick={() => newSigninType('owner')}>Tenho um estúdio</LinkUi>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <LinkUi component="button" variant="body2" onClick={() => newSigninType('customer')}>Sou um cliente</LinkUi>
                </div>
            );
        }
    };

    return (
        <SigninBackground signin>
            <Typography variant="h4" style={{ textAlign: 'center' }}>
                {SIGNIN.TITLE}
            </Typography>
            <CustomTextField
                required
                name={'username'}
                label={SIGNIN.USER}
                field={fields}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <CustomTextField
                required
                name={'password'}
                label={SIGNIN.PASSWORD}
                field={fields}
                variant="outlined"
                type='password'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    ),
                }}
            />
            <CustomFormActions>
                <CustomButton variant='outlined' component={Link} to={`/signup/${type}`}>Cadastrar-se</CustomButton>
                <CustomButton variant='contained' onClick={handleSubmit}>Entrar</CustomButton>
                {renderOptions()}
            </CustomFormActions>
        </SigninBackground >
    );
};

const mapStateToProps = ({ signin }) => ({
    logged: signin.logged,
    loading: signin.loading,
    error: signin.error,
    type: signin.type
});

const mapDispatchToProps = dispatch => ({
    signin: (signinInput, typeInput) => dispatch(signinRequest(signinInput, typeInput)),
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
                props.signin(values, props.type);
            },
        })(withTheme(Signin))
    )
);