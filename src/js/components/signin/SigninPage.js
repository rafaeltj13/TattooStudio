import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import {
    withStyles,
    withTheme,
} from '@material-ui/core';
import SigninBackground from '../custom/signin/SigninBackground';

const Signin = props => {
    return (<SigninBackground />)
};

const mapStateToProps = (state) => ({
    test: 1
});

const mapDispatchToProps = (dispatch) => ({
    test: () => { },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withRouter(
        withFormik({
            mapPropsToValues: () => {
                return {
                    username: '',
                    password: '',
                };
            },
            validationSchema: () =>
                Yup.object().shape({
                    username: Yup.string().required('Campo Required'),
                    password: Yup.string().required('Campo Required')
                }),

            handleSubmit: (values, { props }) => {
                // props.sendLogin(values);
            },
        })(withTheme(Signin))
    )
);