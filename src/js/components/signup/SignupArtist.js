import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import { withTheme } from '@material-ui/core';
import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { SIGNUP, GENERAL } from '../../utils/constants';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/textField/CustomTextField';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';

const SignupArtist = props => {
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
        [loading]
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

            <Typography variant="h6">{SIGNUP.USER_INFORMATION}</Typography>
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
            <Grid container>
                <Grid item xs={9}>
                    <CustomSelect
                        required
                        name={'gender'}
                        label={SIGNUP.GENDER}
                        optionmessage={'Selecione um gênero'}
                        field={fields}
                        optionsmap={[
                            {
                                code: 1,
                                optionLabel: 'Masculino',
                            },
                            {
                                code: 2,
                                optionLabel: 'Feminino',
                            }
                        ]}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={3}>
                    <CustomTextField
                        required
                        name={'age'}
                        label={SIGNUP.AGE}
                        field={fields}
                        variant="outlined"
                        type='number'
                    />
                </Grid>
            </Grid>
            <CustomTextField
                required
                name={'phone'}
                label={SIGNUP.PHONE}
                field={fields}
                variant="outlined"
            />

            <Grid item xs={12} style={{ textAlign: 'right' }}>
                <CustomButton variant='outlined' component={Link} to={'/signin'}>Voltar</CustomButton>
                <CustomButton variant='outlined' onClick={handleSubmit}>Cadastrar-se</CustomButton>
            </Grid>
        </SigninBackground>
    );
};

const mapStateToProps = ({ signup }) => ({
    loading: signup.loading,
    error: signup.error,
});

const mapDispatchToProps = dispatch => ({
    createCustomer: (artistBody, type) => dispatch(createUserRequest(artistBody, type)),
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
                    age: undefined,
                    gender: '',
                    phone: '',
                    specialities: []
                };
            },
            // validationSchema: () =>
            //     Yup.object().shape({
            //         username: Yup.string().required('Campo Required'),
            //         password: Yup.string().required('Campo Required')
            //     }),

            handleSubmit: (values, { props }) => {
                props.createCustomer(values, 'artist')
            },
        })(withTheme(SignupArtist))
    )
);