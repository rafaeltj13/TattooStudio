import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
import { createNotification } from '../../actions/notification-actions';
import { TATTOO, GENERAL } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import CustomTextField from '../custom/textField/CustomTextField';
import CustomFileField from '../custom/textField/CustomFileField';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';
import CustomContainer from '../custom/pages/CustomContainer';

const TattooForm = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification, values } = props;

    console.log(values)

    return (
        <React.Fragment>
            <Typography variant="overline">{TATTOO.TITLE}</Typography>
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
        </React.Fragment>
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