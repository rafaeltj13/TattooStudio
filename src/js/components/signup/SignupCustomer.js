import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import {
    withTheme
} from '@material-ui/core';
import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { SIGNUP, GENERAL } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import TitleTypography from '../custom/typography/CustomTitleTypography';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/textField/CustomOutlinedTextField';
import CustomButton from '../custom/button/CustomButton';
import CustomSelect from '../custom/select/CustomOutlinedSelect';
import CustomDoubleField from '../custom/pages/CustomInlineFields';
import CustomFormActions from '../custom/pages/CustomFormActions';

const SignupCustomer = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification } = props;

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
                    props.history.push('/signin');
                }
            }
        },
        [loading],
    );

    return (
        <SigninBackground>
            <Typography variant="h6">{SIGNUP.ACCOUNT_INFORMATION}</Typography>
            <CustomTextField
                required
                name={'username'}
                label={SIGNUP.USERNAME}
                field={fields}
                variant="outlined"
            />
            <CustomDoubleField>
                <CustomTextField
                    required
                    name={'password'}
                    label={SIGNUP.PASSWORD}
                    field={fields}
                    variant="outlined"
                    type='password'
                />
                <CustomTextField
                    required
                    name={'confirmPassword'}
                    label={SIGNUP.CONFIRM_PASSWORD}
                    field={fields}
                    variant="outlined"
                    type='password'
                />
            </CustomDoubleField>

            <TitleTypography variant="h6">{SIGNUP.USER_INFORMATION}</TitleTypography>
            <CustomTextField
                required
                name={'name'}
                label={SIGNUP.NAME}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                required
                name={'email'}
                label={SIGNUP.EMAIL}
                field={fields}
                variant="outlined"
                type='email'
            />
            <CustomDoubleField>
                <CustomSelect
                    required
                    name={'gender'}
                    label={SIGNUP.GENDER}
                    optionmessage={'Selecione um gênero'}
                    field={fields}
                    optionsmap={[
                        {
                            code: "Masculino",
                            optionLabel: 'Masculino',
                        },
                        {
                            code: "Masculino",
                            optionLabel: 'Feminino',
                        }
                    ]}
                    variant='outlined'
                />
                <CustomTextField
                    required
                    name={'age'}
                    label={SIGNUP.AGE}
                    field={fields}
                    variant="outlined"
                    type='number'
                />
            </CustomDoubleField>
            <CustomTextField
                required
                name={'phone'}
                label={SIGNUP.PHONE}
                field={fields}
                variant="outlined"
            />

            <CustomFormActions>
                <CustomButton variant='outlined' component={Link} to={'/signin'}>Voltar</CustomButton>
                <CustomButton variant='outlined' onClick={handleSubmit}>Cadastrar-se</CustomButton>
            </CustomFormActions>
        </SigninBackground >
    )
}

const mapStateToProps = ({ signup }) => ({
    loading: signup.loading,
    error: signup.error,
});

const mapDispatchToProps = dispatch => ({
    createCustomer: (custommerBody, type) => dispatch(createUserRequest(custommerBody, type)),
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
                    confirmPassword: '',
                    name: '',
                    email: '',
                    age: '',
                    gender: '',
                    phone: ''
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    username: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    password: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    confirmPassword: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    name: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    email: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    age: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    gender: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    phone: Yup.string().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                props.createCustomer(values, 'customer')
            },
        })(withTheme(SignupCustomer))
    )
);