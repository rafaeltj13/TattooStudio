import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getAppointmentsRequest } from '../../actions/appointment-actions';
import { createNotification } from '../../actions/notification-actions';
import { getId } from '../../store/localStorage';
import CustomContainer from '../custom/pages/CustomContainer';
import AppointmentCard from '../custom/card/CustomAppointmentCards';

const AppointmentForm = props => {
    const { appointments, loading, error, newNotification, getAppointments, typeUser } = props;

    useEffect(
        () => {
            getAppointments(typeUser);
        },
        []
    );

    useEffect(
        () => {
            if (!loading) {
                if (error) {
                    newNotification({
                        variant: 'error',
                        message: error
                    });
                }
            }
        },
        [loading]
    );

    const handleClick = appointment => {
        //TODO: Edit appointment
        console.log('Editar appointment')
    };

    return (
        <CustomContainer>
            {appointments.map(appointment => (
                <AppointmentCard
                    image64={appointment.details.imageBase64}
                    user={appointment.details.name}
                    price={appointment.price}
                    onClick={handleClick(appointment)}
                />
            ))}
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment, signin }) => ({
    loading: appointment.loading,
    error: appointment.error,
    appointments: appointment.appointments,
    typeUser: signin.type
});

const mapDispatchToProps = dispatch => ({
    getAppointments: typeUser => dispatch(getAppointmentsRequest(getId(), typeUser)),
    newNotification: payload => dispatch(createNotification(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(AppointmentForm)));