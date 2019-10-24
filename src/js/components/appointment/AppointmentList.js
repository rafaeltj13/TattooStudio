import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getAppointmentsRequest } from '../../actions/appointment-actions';
import { createNotification } from '../../actions/notification-actions';
import { getId } from '../../store/localStorage';
import CustomContainer from '../custom/pages/CustomContainer';
import AppointmentCard from '../custom/card/CustomAppointmentCards';

const AppointmentList = props => {
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
        props.history.push(`/appointment/create/${appointment.id}`);
    };

    return (
        <CustomContainer>
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    imagePath={appointment.details.imagePath}
                    user={appointment.details.name}
                    price={appointment.price}
                    onClick={() => handleClick(appointment)}
                    key={index}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(AppointmentList)));