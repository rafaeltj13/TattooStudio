import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
// import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, GENERAL } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import CustomDatepicker from '../custom/CustomDatepicker';
import CustomTextField from '../custom/textField/CustomTextField';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomFormActions from '../custom/pages/CustomFormActions'
import TattooForm from '../tattoo/TattooForm';

const AppointmentForm = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification, values } = props;

    const renderForm = () => {
        if (values.type === 'tattoo') {
            return (
                <React.Fragment>
                    <TattooForm />
                    <CustomFormActions>
                        <CustomButton component={Link} to={'/'}>Voltar</CustomButton>
                        <CustomButton variant='outlined' onClick={handleSubmit}>Cadastrar-se</CustomButton>
                    </CustomFormActions>
                </React.Fragment>
            );
        }
        else if (values.type === 'art') return /*<ArtForm />*/(<div></div>)
        else return (<div></div>);
    }

    return (
        <CustomContainer>
            <CustomDatepicker
                required
                name={'appointmentDate'}
                label={APPOINTMENT.SELECT_DATE}
                field={fields}
            />
            {values.appointment}
            <CustomSelect
                required
                name={'type'}
                label={APPOINTMENT.SELECT_TYPE}
                optionmessage={'Selecione o tipo de atendimento'}
                field={fields}
                optionsmap={[
                    {
                        code: "tattoo",
                        optionLabel: 'Tatuagem',
                    },
                    {
                        code: "art",
                        optionLabel: 'Criar arte',
                    }
                ]}
            />
            {renderForm()}
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment }) => ({
    loading: appointment.loading,
    error: appointment.error,
});

const mapDispatchToProps = dispatch => ({
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
                    appointmentDate: new Date(),
                    type: '',
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    appointmentDate: Yup.date().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                console.log(values)
                // props.createCustomer(values, 'customer')
            },
        })(withTheme(AppointmentForm))
    )
);