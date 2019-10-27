import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { withTheme } from '@material-ui/core';
import { getAppointmentRequest, editAppointmentRequest, getAvailableHours } from '../../../actions/appointment-actions';
import { createNotification } from '../../../actions/notification-actions';
import { APPOINTMENT, GENERAL, USER_TYPES } from '../../../utils/constants';
import { formatAppointmentDate, containsDate, createDate } from '../../../utils/utils';
import { getScheduleId } from '../../../store/localStorage';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../../custom/CustomButton';
import CustomContainer from '../../custom/pages/CustomContainer';
import CustomDoubleInput from '../../custom/pages/CustomDoubleInput';
import CustomFormActions from '../../custom/pages/CustomFormActions';
import CustomTypography from '../../custom/CustomTypografy';
import CustomDatepicker from '../../custom/CustomDatepicker';
import CustomChipContainer from '../../custom/chip/CustomChipContainer';
import CustomChip from '../../custom/chip/CustomChip';

const AppointmentConfirmation = props => {
    const fields = props;
    const {
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setFieldValue,
        loading,
        error,
        values,
        newNotification,
        selectedAppointment,
        getAppointment,
        availableHours,
        typeUser,
        availableHoursRequest,
        selectedArtist,
        match: {
            params: { id },
        }
    } = props;

    const [render, setRender] = useState(false);
    const [disableFields, setDisableFields] = useState(false);

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
            if (values.pickDate) {
                renderHours();
            }
        },
        [values.pickDate],
    );

    useEffect(
        () => {
            if (Object.entries(selectedAppointment).length > 0) {
                if (typeUser !== USER_TYPES.CUSTOMER) setDisableFields(true);
                // else if (selectedAppointment.status !== APPOINTMENT.STATUS.VALIDATED) setDisableFields(true);

                renderHours();
            }
        },
        [selectedAppointment],
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
                    }
                }
            }
        },
        [loading]
    );

    const renderHours = () => {
        if(!selectedAppointment.totalDuration || !selectedAppointment.sessions) return

        const interval = Math.round(selectedAppointment.totalDuration / selectedAppointment.sessions);
        availableHoursRequest(selectedArtist._id, values.pickDate, interval);
    }

    const addHour = interval => {
        const newInterval = {
            date: values.pickDate,
            start: interval[0],
            end: interval[1]
        }

        if (containsDate(values.dates, newInterval) || values.dates.length + 1 > selectedAppointment.sessions || disableFields) return;

        const newDate = values.dates;
        newDate.push(newInterval);

        setFieldValue("dates", newDate);
    }

    const removeHour = index => {
        values.dates.splice(index, 1);
        setRender(!render);
    }

    const renderAvailableHours = () => {
        if (availableHours.length === 0) return <Typography variant="body2" gutterBottom>{'Nenhum horário disponível neste dia.'}</Typography>

        return (
            <CustomChipContainer>
                {availableHours.map((element, index) =>
                    <CustomChip label={`${element[0]} - ${element[1]} hrs`} onClick={() => addHour(element)} key={index} />)}
            </CustomChipContainer>
        );
    };

    const renderSelectedHours = () => {
        if (values.dates.length === 0) return <Typography variant="body2" gutterBottom>{'Nenhum horário selecionado.'}</Typography>

        return (
            <CustomChipContainer>
                {values.dates.map((element, index) =>
                    <CustomChip label={formatAppointmentDate(element)} onDelete={() => removeHour(index)} key={index} />)}
            </CustomChipContainer>
        );
    }

    return (
        <CustomContainer>
            <CustomDoubleInput>
                <CustomTypography>{`Duração: ${selectedAppointment.totalDuration} horas`}</CustomTypography>
                <CustomTypography>{`Seções: ${selectedAppointment.sessions}`}</CustomTypography>
            </CustomDoubleInput>
            <CustomDoubleInput>
                <CustomTypography>{`R$ ${selectedAppointment.price}`}</CustomTypography>
                <CustomTypography>{`Em até ${selectedAppointment.installments}x`}</CustomTypography>
            </CustomDoubleInput>
            <CustomDatepicker
                required
                name={'pickDate'}
                label={APPOINTMENT.SELECT_DATE}
                field={fields}
                disabled={disableFields}
            />
            <Typography variant="overline" display="block" gutterBottom>Horários Disponíveis</Typography>
            {renderAvailableHours()}
            <Typography variant="overline" display="block" gutterBottom>Horário(s) Selecionado(s)</Typography>
            {renderSelectedHours()}
            <CustomFormActions>
                <CustomButton variant='contained' onClick={handleSubmit} disabled={disableFields || (values.dates.length !== selectedAppointment.sessions)}>Salvar</CustomButton>
            </CustomFormActions>
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment, signin }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
    availableHours: appointment.availableHours,
    typeUser: signin.type,
    selectedArtist: appointment.selectedArtist
});

const mapDispatchToProps = dispatch => ({
    getAppointment: appointmentId => dispatch(getAppointmentRequest(appointmentId)),
    editAppointment: (appointmentId, appointmentBody) => dispatch(editAppointmentRequest(appointmentId, appointmentBody)),
    availableHoursRequest: (artistId, date, interval) => dispatch(getAvailableHours(artistId, date, interval)),
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
                    pickDate: createDate(),
                    dates: [],
                };
            },
            handleSubmit: (values, { props }) => {
                props.editAppointment(props.selectedAppointment._id,
                    {
                        ...values,
                        status: APPOINTMENT.STATUS.APPROVED,
                        details: {
                            customerScheduleId: getScheduleId(),
                            artistScheduleId: props.selectedArtist.schedule
                        }
                    });
            },
        })(withTheme(AppointmentConfirmation))
    )
);