import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getAppointmentsRequest, setSelectedArtist } from '../../actions/appointment-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, USER_TYPES } from '../../utils/constants';
import { getId } from '../../store/localStorage';
import CustomContainer from '../custom/pages/CustomContainer';
import AppointmentCard from '../custom/card/CustomAppointmentCards';

const AppointmentList = props => {
    const { appointments, loading, error, newNotification, getAppointments, typeUser, selectedArtist } = props;

    useEffect(
        () => {
            getAppointments(typeUser);
            selectedArtist({});
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
        selectedArtist(appointment.artist)
        appointment.appointment.status === APPOINTMENT.STATUS.CREATED ? props.history.push(`/appointment/create/${appointment.appointment._id}`)
            :  props.history.push(`/appointment/confirm/${appointment.appointment._id}`);
    };

    return (
        <CustomContainer>
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    imagePath={appointment.appointment['tattoo'].imagePath}
                    user={appointment[typeUser === USER_TYPES.CUSTOMER ? USER_TYPES.ARTIST : USER_TYPES.CUSTOMER].name}
                    price={appointment.appointment.price}
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
    selectedArtist: artist => dispatch(setSelectedArtist(artist)),
    newNotification: payload => dispatch(createNotification(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(AppointmentList)));