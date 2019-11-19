import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { SIGNUP, GENERAL } from '../../utils/constants';
import { formatOwner } from '../../utils/utils';
import Typography from '@material-ui/core/Typography';
import CustomTitleTypography from '../custom/typography/CustomTitleTypography';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/textField/CustomOutlinedTextField';
import CustomButton from '../custom/button/CustomButton';
import CustomSelect from '../custom/select/CustomOutlinedSelect';
import CustomDoubleField from '../custom/pages/CustomInlineFields';
import CustomStepper from '../custom/pages/CustomStepper';
import CustomFormActions from '../custom/pages/CustomFormActions';

const getSteps = () => {
    return ['Dados do estabelecimento', 'Horário de trabalho', 'Dados do usuário'];
}

const personalDataStep = fields => (
    <Fragment>
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
    </Fragment>
);

const workTimeStep = fields => (
    <Fragment>
        <CustomTitleTypography variant="h6" style={{ marginTop: 0 }}>{SIGNUP.STUDIO_WORKTIME}</CustomTitleTypography>
        <Typography variant="body1">{SIGNUP.STUDIO_WORKTIME_WEEK}</Typography>
        <CustomDoubleField>
            <CustomTextField
                name={'weekMoringStart'}
                label={SIGNUP.STUDIO_MORNING_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'weekMoringEnd'}
                label={SIGNUP.STUDIO_MORNING_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'weekAfternoonStart'}
                label={SIGNUP.STUDIO_AFTERNOON_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'weekAfternoonEnd'}
                label={SIGNUP.STUDIO_AFTERNOON_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'weekNightStart'}
                label={SIGNUP.STUDIO_NIGHT_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'weekNightEnd'}
                label={SIGNUP.STUDIO_NIGHT_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <Typography variant="body1" style={{ marginTop: 24 }}>{SIGNUP.STUDIO_WORKTIME_SATURDAY}</Typography>
        <CustomDoubleField>
            <CustomTextField
                name={'saturdayMoringStart'}
                label={SIGNUP.STUDIO_MORNING_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'saturdayMoringEnd'}
                label={SIGNUP.STUDIO_MORNING_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'saturdayAfternoonStart'}
                label={SIGNUP.STUDIO_AFTERNOON_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'saturdayAfternoonEnd'}
                label={SIGNUP.STUDIO_AFTERNOON_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'saturdayNightStart'}
                label={SIGNUP.STUDIO_NIGHT_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'saturdayNightEnd'}
                label={SIGNUP.STUDIO_NIGHT_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <Typography variant="body1" style={{ marginTop: 24 }}>{SIGNUP.STUDIO_WORKTIME_SUNDAY}</Typography>
        <CustomDoubleField>
            <CustomTextField
                name={'sundayMoringStart'}
                label={SIGNUP.STUDIO_MORNING_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'sundayMoringEnd'}
                label={SIGNUP.STUDIO_MORNING_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'sundayAfternoonStart'}
                label={SIGNUP.STUDIO_AFTERNOON_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'sundayAfternoonEnd'}
                label={SIGNUP.STUDIO_AFTERNOON_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
        <CustomDoubleField>
            <CustomTextField
                name={'sundayNightStart'}
                label={SIGNUP.STUDIO_NIGHT_START_WEEK}
                field={fields}
                variant="outlined"
            />
            <CustomTextField
                name={'sundayNightEnd'}
                label={SIGNUP.STUDIO_NIGHT_END_WEEK}
                field={fields}
                variant="outlined"
            />
        </CustomDoubleField>
    </Fragment>
);

const studioDataStep = fields => (
    <Fragment>
        <CustomTitleTypography variant="h6">{SIGNUP.STUDIO_INFORMATION}</CustomTitleTypography>
        <CustomTextField
            required
            name={'studioName'}
            label={SIGNUP.STUDIO_NAME}
            field={fields}
            variant="outlined"
        />
        <CustomTextField
            required
            name={'address'}
            label={SIGNUP.STUDIO_ADDRESS}
            field={fields}
            variant="outlined"
        />
        <CustomTextField
            required
            name={'information'}
            label={SIGNUP.STUDIO_EXTRA_INFORMATION}
            field={fields}
            variant="outlined"
        />
        <CustomTextField
            required
            name={'studioPhone'}
            label={SIGNUP.STUDIO_PHONE}
            field={fields}
            variant="outlined"
        />
    </Fragment>
);

const getStepContent = (step, fields) => {
    switch (step) {
        case 0:
            return studioDataStep(fields);
        case 1:
            return workTimeStep(fields);
        case 2:
            return personalDataStep(fields);
        default:
            return 'Unknown step';
    }
};

const renderButtonLabel = (activeStep) => {
    return activeStep === 2 ? 'Cadastrar-se' : 'Avançar';
};

const SignupOwner = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification } = props;

    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        activeStep > 0 ? setActiveStep(prevActiveStep => prevActiveStep - 1) : props.history.push('/signin');
    };

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
            <CustomStepper activeStep={activeStep} steps={steps} />
            {getStepContent(activeStep, fields)}
            <CustomFormActions>
                <CustomButton variant='outlined' onClick={handleBack}>Voltar</CustomButton>
                {/* <CustomButton variant='outlined' onClick={activeStep < 2 ? handleNext : handleSubmit}>{renderButtonLabel(activeStep)}</CustomButton> */}
                {activeStep < 2 ?
                    <CustomButton variant='outlined' onClick={handleNext}>Avançar</CustomButton>
                    : <CustomButton variant='outlined' onClick={handleSubmit}>Cadastrar-se</CustomButton>
                }
            </CustomFormActions>
        </SigninBackground>
    );
}

const mapStateToProps = ({ signup }) => ({
    loading: signup.loading,
    error: signup.error,
});

const mapDispatchToProps = dispatch => ({
    createUser: (ownerBody, type) => dispatch(createUserRequest(ownerBody, type)),
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
                    name: '',
                    email: '',
                    phone: '',
                    age: '',
                    gender: '',
                    studioName: '',
                    address: '',
                    information: '',
                    studioPhone: '',
                    weekMoringStart: '',
                    weekMoringEnd: '',
                    weekAfternoonStart: '',
                    weekAfternoonEnd: '',
                    weekNightStart: '',
                    weekNightEnd: '',
                    saturdayMoringStart: '',
                    saturdayMoringEnd: '',
                    saturdayAfternoonStart: '',
                    saturdayAfternoonEnd: '',
                    saturdayNightStart: '',
                    saturdayNightEnd: '',
                    sundayMoringStart: '',
                    sundayMoringEnd: '',
                    sundayAfternoonStart: '',
                    sundayAfternoonEnd: '',
                    sundayNightStart: '',
                    sundayNightEnd: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
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
                    studioName: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    address: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    information: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    studioPhone: Yup.string().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                const owner = formatOwner(values);
                props.createUser(owner, 'owner')
            },
        })(withTheme(SignupOwner))
    )
);