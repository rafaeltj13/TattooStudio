import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../actions/notification-actions';
import { TATTOO, GENERAL } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomTextField from '../custom/textField/CustomTextField';
import CustomFileField from '../custom/textField/CustomFileField';
import CustomButton from '../custom/CustomButton';

const TattooForm = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification, values, open } = props;

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(); //Action de fechar o dialog
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
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

const mapStateToProps = ({ tattoo }) => ({
    loading: tattoo.loading,
    error: tattoo.error,
});

const mapDispatchToProps = dispatch => ({
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
                console.log(values)
                // props.createCustomer(values, 'customer')
            },
        })(withTheme(TattooForm))
    )
);