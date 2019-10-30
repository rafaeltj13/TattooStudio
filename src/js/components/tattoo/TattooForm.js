import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { createTattooRequest, showTattooDialog } from '../../actions/tattoo-actions';
import { createNotification } from '../../actions/notification-actions';
import { setAppointmentData } from '../../actions/appointment-actions';
import { TATTOO, GENERAL } from '../../utils/constants';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomTextField from '../custom/textField/CustomTextField';
import CustomFileField from '../custom/textField/CustomFileField';
import CustomButton from '../custom/CustomButton';

const TattooForm = props => {
    const fields = props;
    const { appointment, isSubmitting, handleSubmit, setSubmitting, values, newTattoo, loading, error, newNotification, open, tattooDialog, setAppointment } = props;

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
                        handleClose();
                    }
                }
            }
        },
        [loading, error]
    );

    const handleClose = () => {
        if (appointment) setAppointment({ id: newTattoo._id, imageBase64: values.imageBase64 })
        tattooDialog(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{TATTOO.TITLE}</DialogTitle>
            <DialogContent>
                <CustomFileField
                    required
                    name={'imageBase64'}
                    label={TATTOO.IMAGEM}
                    field={fields}
                />
                <CustomTextField
                    required
                    name={'size'}
                    label={TATTOO.SIZE}
                    field={fields}
                    type='number'
                />
                <CustomTextField
                    required
                    name={'place'}
                    label={TATTOO.PLACE}
                    field={fields}
                />
            </DialogContent>
            <DialogActions>
                <CustomButton variant='contained' onClick={handleClose}>Cancelar</CustomButton>
                <CustomButton variant='contained' onClick={handleSubmit}>Criar Tatuagem</CustomButton>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({ tattoo, signin }) => ({
    loading: tattoo.loading,
    error: tattoo.error,
    open: tattoo.openForm,
    newTattoo: tattoo.tattoo,
    typeUser: signin.type,
    idUser: signin.idUser,
});

const mapDispatchToProps = dispatch => ({
    createTattoo: tattooBody => dispatch(createTattooRequest(tattooBody)),
    tattooDialog: show => dispatch(showTattooDialog(show)),
    setAppointment: tattoo => dispatch(setAppointmentData(tattoo)),
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
                    imageBase64: '',
                    size: '',
                    place: ''
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    imageBase64: Yup.string().required(GENERAL.REQUIRED_FIELD),
                    size: Yup.number().required(GENERAL.REQUIRED_FIELD),
                    place: Yup.string().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                props.createTattoo({ ...values, user: { id: props.idUser, type: props.typeUser } })
            },
        })(withTheme(TattooForm))
    )
);