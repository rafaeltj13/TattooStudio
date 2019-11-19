import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'material-ui-image';
import { withTheme } from '@material-ui/core';
import { createAppointmentRequest, setAppointmentData } from '../../actions/appointment-actions';
import { showTattooDialog, showTattooListDialog } from '../../actions/tattoo-actions';
import { createNotification } from '../../actions/notification-actions';
import { getId } from '../../store/localStorage';
import { APPOINTMENT, TATTOO, GENERAL, USER_TYPES, UTILS } from '../../utils/constants';
import CustomDatepicker from '../custom/CustomDatepicker';
import CustomButton from '../custom/button/CustomButton';
import CustomSelect from '../custom/select/CustomSelect';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomFormActions from '../custom/pages/CustomFormActions';
import TattooForm from '../tattoo/TattooForm';
import TattooList from '../tattoo/TattooList';

const AppointmentForm = props => {
    const fields = props;
    const {
        isSubmitting,
        handleSubmit,
        setSubmitting,
        loading,
        error,
        newNotification,
        values,
        tattooDialog,
        selectedAppointment,
        tattooListDialog,
        setAppointment,
    } = props;

    const [searchUserDetails, setSearchUserDetails] = useState({ title: '', typeUser: '', idUser: '' })

    useEffect(
        () => {
            setAppointment({});
        },
        []
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
                        props.history.push('/');
                    }
                }
            }
        },
        [loading, error]
    );

    const showTestList = (title, typeUser, idUser) => {
        setSearchUserDetails({ title, typeUser, idUser });

        tattooListDialog();
    }

    const selectTattoo = (tattooId, imageBase64) => {
        setAppointment({ tattoo: tattooId, imageBase64 });
    }

    const renderForm = () => {
        if (selectedAppointment.imageBase64) {
            const src = selectedAppointment.imageBase64.split(":")[0] === 'data' ?
                selectedAppointment.imageBase64 : `${UTILS.apiUrl}/${selectedAppointment.imageBase64}`;

            return (
                <CustomFormActions>
                    <Image src={src} />
                    <CustomButton variant='outlined' onClick={handleSubmit} width>Solicitar</CustomButton>
                </CustomFormActions >
            );
        }

        if (values.type === 'tattoo') {
            return (
                <React.Fragment>
                    <TattooForm appointment />
                    <TattooList
                        title={searchUserDetails.title}
                        typeUser={searchUserDetails.typeUser}
                        idUser={searchUserDetails.idUser}
                        onClick={selectTattoo}
                    />
                    <CustomFormActions>
                        <CustomButton width variant='outlined' onClick={() => showTestList(TATTOO.AVAILABLE, USER_TYPES.ARTIST, props.artistId)}>Tatuagens do tatuador</CustomButton>
                        <CustomButton width variant='outlined' onClick={() => showTestList(TATTOO.MY_TATTOOS, USER_TYPES.CUSTOMER, getId())}> Escolher minha tatuagem</CustomButton>
                        <CustomButton width variant='outlined' onClick={() => tattooDialog(true)}>Criar nova tatuagem</CustomButton>
                    </CustomFormActions>
                </React.Fragment>
            );
        }
        else if (values.type === 'art') {
            return (
                <React.Fragment>
                    <TattooForm appointment art />
                    <CustomFormActions>
                        <CustomButton width variant='outlined' onClick={() => tattooDialog(true)}>Escolher imagem</CustomButton>
                    </CustomFormActions>
                </React.Fragment>
            )
        }
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
    tattooDialog: () => dispatch(showTattooDialog(true)),
    tattooListDialog: () => dispatch(showTattooListDialog(true)),
    setAppointment: tattoo => dispatch(setAppointmentData(tattoo)),
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
                    tattoo: props.selectedAppointment.tattoo,
                    status: APPOINTMENT.STATUS.CREATED,
                }, props.tokenToNotificate);
            },
        })(withTheme(AppointmentForm))
    )
);