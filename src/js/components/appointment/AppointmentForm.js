import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'material-ui-image';
import { withTheme } from '@material-ui/core';
import { createAppointmentRequest } from '../../actions/appointment-actions';
import { showTattooDialog } from '../../actions/tattoo-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, GENERAL } from '../../utils/constants';
import CustomDatepicker from '../custom/CustomDatepicker';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomFormActions from '../custom/pages/CustomFormActions';
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
                disabled
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
                        optionLabel: 'Arte',
                    }
                ]}
            />
            {renderForm()}
        </CustomContainer>
    );
};

const mapStateToProps = ({ appointment, signin, profile }) => ({
    loading: appointment.loading,
    error: appointment.error,
    selectedAppointment: appointment.selectedAppointment,
    idUser: signin.idUser,
    artistId: profile.selectedArtist._id,
    tokenToNotificate: profile.selectedArtist.notificationToken,
});

const mapDispatchToProps = dispatch => ({
    createAppointment: (appointmentBody, tokenToNotificate) => dispatch(createAppointmentRequest(appointmentBody, tokenToNotificate)),
    tattooDialog: show => dispatch(showTattooDialog(show)),
    newNotification: payload => dispatch(createNotification(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: props => ({
                artist: props.artistId,
                appointmentDate: new Date(),
                type: '',
            }),
            validationSchema: () =>
                Yup.object().shape({
                    appointmentDate: Yup.date().required(GENERAL.REQUIRED_FIELD),
                    type: Yup.string().required(GENERAL.REQUIRED_FIELD)
                }),

            handleSubmit: (values, { props }) => {
                props.createAppointment({
                    ...values,
                    customer: props.idUser,
                    tattoo: props.selectedAppointment.id,
                    status: APPOINTMENT.STATUS.CREATED,
                }, props.tokenToNotificate);
            },
        })(withTheme(AppointmentForm))
    )
);