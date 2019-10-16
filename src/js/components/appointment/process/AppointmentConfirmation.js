import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { getAppointmentRequest, editAppointmentRequest } from '../../../actions/appointment-actions';
import { createNotification } from '../../../actions/notification-actions';
import { APPOINTMENT, TATTOO, GENERAL, USER_TYPES, UTILS } from '../../../utils/constants';
import { validateAppointment } from '../../../utils/utils';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../../custom/CustomButton';
import CustomTextField from '../../custom/textField/CustomTextField';
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
        setValues,
        setFieldValue,
        loading,
        error,
        values,
        newNotification,
        selectedAppointment,
        getAppointment,
        availableHours,
        typeUser,
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

    const addHour = interval => {
        // if(values.date.includes(interval)) return;

        const newDate = values.date;

        console.log(values.pickDate, interval)

        if(!newDate.includes(values.pickDate)){
            newDate[values.pickDate] = [];
        }

        newDate[values.pickDate].push(interval)

        setFieldValue("date", newDate);
    }

    const renderAvailableHours = () => {
        if (availableHours.length === 0) return <Typography variant="body2" gutterBottom>{'Nenhum horário disponível neste dia.'}</Typography>

        return (
            <CustomChipContainer>
                {availableHours.map((element, index) => <CustomChip label={`${element[0]} - ${element[1]} hrs`} onDelete={() => addHour(element)} key={index} />)}
            </CustomChipContainer>
        );
    };

    return (
        <CustomContainer>
            <CustomDoubleInput>
                <CustomTypography>{`Duração: ${selectedAppointment.totalDuration}`}</CustomTypography>
                <CustomTypography>{`Seções: ${selectedAppointment.sessions}`}</CustomTypography>
            </CustomDoubleInput>
            <CustomDoubleInput>
                <CustomTypography>{`Preço R$ ${selectedAppointment.price}`}</CustomTypography>
                <CustomTypography>{`Em até ${selectedAppointment.installments}x`}</CustomTypography>
            </CustomDoubleInput>
            <CustomDatepicker
                required
                name={'pickDate'}
                label={APPOINTMENT.SELECT_DATE}
                field={fields}
            />
            <Typography variant="overline" display="block" gutterBottom>Horários Disponíveis</Typography>
            {renderAvailableHours()}
            <Typography variant="overline" display="block" gutterBottom>Horário(s) Selecionado(s)</Typography>
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment, signin }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
    availableHours: appointment.availableHours,
    typeUser: signin.type
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
                    pickDate: new Date(),
                    date: [],
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    pickDate: Yup.date().required(GENERAL.REQUIRED_FIELD),
                    date: Yup.array().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                props.editAppointment(props.selectedAppointment._id,
                    { ...values, status: APPOINTMENT.STATUS.APPROVED }
                );
            },
        })(withTheme(AppointmentConfirmation))
    )
);