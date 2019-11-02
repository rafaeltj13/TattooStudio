import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { SIGNUP, GENERAL } from '../../utils/constants';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CustomTitleTypography from '../custom/typography/CustomTitleTypography';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/textField/CustomOutlinedTextField';
import CustomButton from '../custom/button/CustomButton';
import CustomSelect from '../custom/select/CustomOutlinedSelect';
import CustomDoubleField from '../custom/pages/CustomDoubleInput';

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

            <CustomTitleTypography variant="h6">{SIGNUP.USER_INFORMATION}</CustomTitleTypography>
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
            <CustomTextField
                required
                name={'phone'}
                label={SIGNUP.PHONE}
                field={fields}
                variant="outlined"
            />
            <CustomDoubleField>
                <CustomTextField
                    required
                    name={'age'}
                    label={SIGNUP.AGE}
                    field={fields}
                    variant="outlined"
                    type='number'
                />
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
                            code: "Feminino",
                            optionLabel: 'Feminino',
                        }
                    ]}
                    variant='outlined'
                />
            </CustomDoubleField>

            <CustomTitleTypography variant="h6">{SIGNUP.PROFISSIONAL_INFORMATION}</CustomTitleTypography>
            <CustomTextField
                required
                name={'specialty'}
                label={SIGNUP.SPECIALITY}
                field={fields}
                variant="outlined"
            />
            <CustomDoubleField>
            <CustomTextField
                required
                name={'experienceYears'}
                label={SIGNUP.EXPERIENCE_YEARS}
                field={fields}
                type='number'
                variant="outlined"
            />
            <CustomTextField
                required
                name={'trace'}
                label={SIGNUP.TRACE}
                field={fields}
                variant="outlined"
            />
            </CustomDoubleField>

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
    createUser: (artistBody, type) => dispatch(createUserRequest(artistBody, type)),
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
                    phone: '',
                    specialty: '',
                    experienceYears: '',
                    trace: '',
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
                    specialty: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    experienceYears: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    trace: Yup.string().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                props.createUser(values, 'artist')
            },
        })(withTheme(SignupArtist))
    )
);