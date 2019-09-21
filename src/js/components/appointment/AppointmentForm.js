import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withTheme } from '@material-ui/core';
// import { createUserRequest } from '../../actions/signup-actions';
import { createNotification } from '../../actions/notification-actions';
import { APPOINTMENT, GENERAL } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import CustomDatepicker from '../custom/CustomDatepicker';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';
import CustomSelect from '../custom/CustomSelect';

const AppointmentForm = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, loading, error, newNotification, values } = props;
    
    return (
        <div>
            <CustomDatepicker
                required
                name={'appointmentDate'}
                label={APPOINTMENT.SELECT_DATE}
                field={fields}
            />
            {values.appointment}
        </div>
    );
};

const mapStateToProps = ({ appointment }) => ({
    loading: appointment.loading,
    error: appointment.error,
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
                    appointmentDate: new Date(),
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    appointmentDate: Yup.string().required(GENERAL.REQUIRED_FIELD),
                }),

            handleSubmit: (values, { props }) => {
                console.log(values)
                // props.createCustomer(values, 'customer')
            },
        })(withTheme(AppointmentForm))
    )
);