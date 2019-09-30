import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'material-ui-image'
import { withTheme } from '@material-ui/core';
import { createAppointmentRequest } from '../../actions/appointment-actions';
import { showTattooDialog } from '../../actions/tattoo-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, GENERAL } from '../../utils/constants';
import CustomDatepicker from '../custom/CustomDatepicker';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomFormActions from '../custom/pages/CustomFormActions'
import TattooForm from '../tattoo/TattooForm';

const AppointmentForm = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification, values, tattooDialog, selectedAppointment } = props;

    useEffect(
        () => {
            if (!loading) {
                if (isSubmitting) {
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
            }
        },
        [loading, error]
    );

    const renderForm = () => {
        if (selectedAppointment.imageBase64) {
            return (
                <CustomFormActions>
                    <Image src={selectedAppointment.imageBase64} />
                    <CustomButton variant='outlined' onClick={handleSubmit} width>Solicitar</CustomButton>
                </CustomFormActions >
            );
        }

        if (values.type === 'tattoo') {
            return (
                <React.Fragment>
                    <TattooForm appointment />
                    <CustomFormActions>
                        <CustomButton variant='outlined' onClick={() => { }}>Escolher Tatuagem</CustomButton>
                        <CustomButton variant='outlined' onClick={() => tattooDialog(true)}>Criar nova Tatuagem</CustomButton>
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

const mapStateToProps = ({ appointment, signin }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
    idUser: signin.idUser
});

const mapDispatchToProps = dispatch => ({
    createAppointment: appointmentBody => dispatch(createAppointmentRequest(appointmentBody)),
    tattooDialog: show => dispatch(showTattooDialog(show)),
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
                    artist: '5d7d5b98e548471b0cbe3d1a',
                    appointmentDate: new Date(),
                    type: '',
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    appointmentDate: Yup.date().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                console.log({ ...values, customer: props.idUser, tattoo: props.selectedAppointment.id })
                props.createAppointment({ ...values, customer: props.idUser, tattoo: props.selectedAppointment.id })
            },
        })(withTheme(AppointmentForm))
    )
);