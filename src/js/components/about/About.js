import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getUserDetailsRequest } from '../../actions/about-actions';
import { createNotification } from '../../actions/notification-actions';
import { getId } from '../../store/localStorage';

const About = props => {
    const { getUserDetails, newNotification, userDetails, typeUser } = props;

    useEffect(
        () => {
            getUserDetails(typeUser);
        },
        []
    );
};

const mapStateToProps = ({ about, signin }) => ({
    loading: about.loading,
    error: about.error,
    userDetails: about.user,
    typeUser: signin.type
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: typeUser => dispatch(getUserDetailsRequest(getId(), typeUser)),
    newNotification: payload => dispatch(createNotification(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(About)));