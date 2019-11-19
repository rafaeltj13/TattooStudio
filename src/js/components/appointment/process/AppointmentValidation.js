import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'material-ui-image'
import { withTheme } from '@material-ui/core';
import { getAppointmentRequest, editAppointmentRequest } from '../../../actions/appointment-actions';
import { createNotification } from '../../../actions/notification-actions';
import { APPOINTMENT, GENERAL, USER_TYPES, UTILS } from '../../../utils/constants';
import { validateAppointment } from '../../../utils/utils';
import CustomButton from '../../custom/button/CustomButton';
import CustomTextField from '../../custom/textField/CustomTextField';
import CustomContainer from '../../custom/pages/CustomContainer';
import CustomDoubleInput from '../../custom/pages/CustomInlineFields';
import CustomFormActions from '../../custom/pages/CustomFormActions';
import CustomTypography from '../../custom/typography/CustomTypografy';

const AppointmentValidation = props => {
    const fields = props;
    const {
        isSubmitting,
        handleSubmit,
        setSubmitting,
        setValues,
        loading,
        error,
        values,
        newNotification,
        selectedAppointment,
        getAppointment,
        typeUser,
        match: {
            params: { id },
        }
    } = props;

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
            if (selectedAppointment) {
                if (typeUser !== USER_TYPES.ARTIST) setDisableFields(true);
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
                    } else if (validateAppointment(selectedAppointment)) {
                        setValues({
                            ...values,
                            artist: selectedAppointment.artist._id,
                            customer: selectedAppointment.customer._id,
                            tattoo: selectedAppointment.tattoo._id,
                            tattoSize: selectedAppointment.tattoo.size,
                            tattooPlace: selectedAppointment.tattoo.place
                        });
                    }
                }
            }
        },
        [loading]
    );

    const renderAppointmentDetails = () => {
        if (!selectedAppointment.tattoo) return <div></div>;

        return (
            <React.Fragment>
                <Image src={`${UTILS.apiUrl}/${selectedAppointment.tattoo.imagePath}`} />
                <CustomDoubleInput>
                    <CustomTypography>{`${selectedAppointment.tattoo.size} cm`}</CustomTypography>
                    <CustomTypography>{`Local: ${selectedAppointment.tattoo.place}`}</CustomTypography>
                </CustomDoubleInput>
            </React.Fragment>

        )
    }

    return (
        <CustomContainer>
            {renderAppointmentDetails()}
            <CustomDoubleInput>
                <CustomTextField
                    required
                    name={'totalDuration'}
                    label={APPOINTMENT.TOTAL_DURATION}
                    field={fields}
                    type='number'
                    disabled={disableFields}
                />
                <CustomTextField
                    required
                    name={'sessions'}
                    label={APPOINTMENT.SESSIONS}
                    field={fields}
                    type='number'
                    disabled={disableFields}
                />
            </CustomDoubleInput>
            <CustomDoubleInput>
                <CustomTextField
                    required
                    name={'price'}
                    label={APPOINTMENT.PRICE}
                    field={fields}
                    type='number'
                    disabled={disableFields}
                />
                <CustomTextField
                    required
                    name={'installments'}
                    label={APPOINTMENT.INSTALLMENTS}
                    field={fields}
                    type='number'
                    disabled={disableFields}
                />
            </CustomDoubleInput>
            <CustomFormActions>
                <CustomButton variant='outlined' component={Link} to={`/appointment`}>Voltar</CustomButton>
                {!disableFields ?
                    <CustomButton variant='contained' onClick={handleSubmit}>Salvar</CustomButton> : <React.Fragment />
                }

            </CustomFormActions>
        </CustomContainer>
    );

};


const mapStateToProps = ({ appointment, signin }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
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
                    price: 0,
                    sessions: 0,
                    totalDuration: 0,
                    installments: 0,
                    tattoSize: 0
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    price: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    sessions: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    totalDuration: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    installments: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    tattoSize: Yup.number()
                }),

            handleSubmit: (values, { props }) => {
                props.editAppointment(props.selectedAppointment._id,
                    { ...values, status: APPOINTMENT.STATUS.VALIDATED }
                );
            },
        })(withTheme(AppointmentValidation))
    )
);