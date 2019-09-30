import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'material-ui-image'
import { withTheme } from '@material-ui/core';
import { getAppointmentRequest, editAppointmentRequest } from '../../../actions/appointment-actions';
import { createNotification } from '../../../actions/notification-actions';
import { APPOINTMENT, GENERAL } from '../../../utils/constants';
import CustomButton from '../../custom/CustomButton';
import CustomSelect from '../../custom/CustomSelect';
import CustomContainer from '../../custom/pages/CustomContainer';
import CustomFormActions from '../../custom/pages/CustomFormActions'

const AppointmentValidation = props => {
    const fields = props;
    const {
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setValues,
        loading,
        error,
        newNotification,
        selectedAppointment,
        getAppointment,
        match: {
            params: { id },
        }
    } = props;

    useEffect(
        () => {
            if (id) {
                getAppointment(id);
            }
        },
        [id],
    );

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
                        props.history.push('/appointment');
                    }
                } else {
                    if (error) {
                        newNotification({
                            variant: 'error',
                            message: error
                        });
                    } else {
                        setValues({ ...selectedAppointment });
                    }
                }
            }
        },
        [loading]
    );

    return (<div></div>);

};


const mapStateToProps = ({ appointment }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
});

const mapDispatchToProps = dispatch => ({
    getAppointment: appointmentId => dispatch(getAppointmentRequest(appointmentId)),
    editAppointment: (appointmentId, appointmentBody) => dispatch(editAppointmentRequest(appointmentId, appointmentBody)),
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
                    price: '',
                    sessions: '',
                    totalDuration: '',
                    installments: ''
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    price: Yup.string().number(GENERAL.REQUIRED_FIELD),
                    sessions: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    totalDuration: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    installments: Yup.number().required(GENERAL.REQUIRED_FIELD)
                }),

            handleSubmit: (values, { props }) => {
                console.log(values)
                // props.editAppointment({ ...values, customer: props.idUser, tattoo: props.selectedAppointment.id })
            },
        })(withTheme(AppointmentValidation))
    )
);