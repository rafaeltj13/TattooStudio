import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import {
    withTheme
} from '@material-ui/core';
import { createCustomerRequest } from '../../actions/signup-actions'
import Grid from '@material-ui/core/Grid';
import SigninBackground from '../custom/signin/SigninBackground';
import CustomTextField from '../custom/CustomTextField';
import CustomButton from '../custom/CustomButton';

const SignupCustomer = props => {
    const fields = props;
    const { isSubmitting, handleSubmit, setSubmitting, handleChange, values, newSigninType, loading, error, type } = props;

    return (
        <div></div>
    )
}

const mapStateToProps = ({ signup }) => ({
    loading: signup.loading,
    error: signup.error,
});

const mapDispatchToProps = dispatch => ({
    createCustomer: (custommerBody, type) => dispatch(createCustomerRequest(custommerBody, type))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: () => {
                return {
                    name: '',
                    username: '',
                    password: '',
                    email: '',
                    age: null,
                    gender: '',
                    phone: ''
                };
            },
            // validationSchema: () =>
            //     Yup.object().shape({
            //         username: Yup.string().required('Campo Required'),
            //         password: Yup.string().required('Campo Required')
            //     }),

            handleSubmit: (values, { props }) => {
                console.log(values)
            },
        })(withTheme(SignupCustomer))
    )
);