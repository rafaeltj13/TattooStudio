import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getAppointmentsRequest, setSelectedArtist, getStudioAppointmentsRequest, editAppointmentRequest } from '../../actions/appointment-actions';
import { rateArtistRequest } from '../../actions/profile-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, USER_TYPES, GENERAL } from '../../utils/constants';
import { getId } from '../../store/localStorage';
import CustomContainer from '../custom/pages/CustomContainer';
import AppointmentCard from '../custom/card/CustomAppointmentCards';

const AppointmentList = props => {
    const {
        appointments,
        loading,
        error,
        newNotification,
        getAppointments,
        typeUser,
        selectedArtist,
        getStudioAppointments,
        editAppointment,
        profileLoading,
        rateArtist,
    } = props;

    useEffect(
        () => {
            renderAppointments();
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
                } else {
                    newNotification({
                        variant: 'success',
                        message: GENERAL.SUCCESS_MESSAGE
                    })
                }
            }
        },
        [loading]
    );

    const renderAppointments = () => {
        if (typeUser === 'owner') getStudioAppointments();
        else {
            getAppointments(typeUser);
        }
    };

    const updateAppointmentStatus = (status, appointmentId) => {
        const newStatus = status === APPOINTMENT.STATUS.APPROVED ? APPOINTMENT.STATUS.FINISHED : APPOINTMENT.STATUS.EVALUATED;

        editAppointment(appointmentId, { status: newStatus }).then(() => renderAppointments())
    };

    const rateArtistAction = (status, appointmentId, artistId, rating) => {
        updateAppointmentStatus(status, appointmentId);
        rateArtist(artistId, rating);
    };

    const handleClick = appointment => {
        if(appointment.appointment.status === APPOINTMENT.STATUS.FINISHED ||
            appointment.appointment.status === APPOINTMENT.STATUS.EVALUATED ||
            appointment.appointment.status === APPOINTMENT.STATUS.APPROVED) return;

        selectedArtist(appointment.artist)
        appointment.appointment.status === APPOINTMENT.STATUS.CREATED ? props.history.push(`/appointment/create/${appointment.appointment._id}`)
            : props.history.push(`/appointment/confirm/${appointment.appointment._id}`);
    };

    const handleActions = (status, appointmentId, artistId, rating) => status === APPOINTMENT.STATUS.APPROVED ?
        updateAppointmentStatus(status, appointmentId) : rateArtistAction(status, appointmentId, artistId, rating);

    return (
        <CustomContainer>
            {appointments.length > 0 || <Typography variant="subtitle2" gutterBottom> Nenhum agendamento encontrado. </Typography>}
            {appointments.map((appointment, index) => (
                <AppointmentCard
                    id={appointment.appointment._id}
                    imagePath={appointment.appointment['tattoo'].imagePath}
                    user={appointment[typeUser === USER_TYPES.ARTIST ? USER_TYPES.CUSTOMER : USER_TYPES.ARTIST].name}
                    price={appointment.appointment.price}
                    onClick={() => handleClick(appointment)}
                    key={index}
                    loggedUser={typeUser}
                    status={appointment.appointment.status}
                    dates={appointment.dates}
                    handleAction={handleActions}
                    artistId={appointment.artist._id}
                />
            ))}
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment, signin, profile }) => ({
    loading: appointment.loading,
    error: appointment.error,
    appointments: appointment.appointments,
    typeUser: signin.type,
    profileLoading: profile.loading,
});

const mapDispatchToProps = dispatch => ({
    getAppointments: typeUser => dispatch(getAppointmentsRequest(getId(), typeUser)),
    selectedArtist: artist => dispatch(setSelectedArtist(artist)),
    getStudioAppointments: () => dispatch(getStudioAppointmentsRequest()),
    editAppointment: (appointmentId, status) => dispatch(editAppointmentRequest(appointmentId, status)),
    rateArtist: (artistId, rating) => dispatch(rateArtistRequest(artistId, rating)),
    newNotification: payload => dispatch(createNotification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(AppointmentList)));