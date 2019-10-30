import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import CustomButton from '../custom/CustomButton';
import { askForNotifications } from '../../utils/push-notifications';
import { setTokenPushNotificationsRequest } from '../../actions/signin-actions';

const Home = props => {
    const { tokenPushNotifications, idUser, typeUser } = props;
    
    askForNotifications()
        .then(token => tokenPushNotifications(token, typeUser, idUser));

    return (
        <div>
            <CustomButton variant='outlined' component={Link} to={'/appointment/create'}>Agendamento</CustomButton>
        </div>
    )
};

const mapStateToProps = ({ signin }) => ({
    pushNotificationToken: signin.pushNotificationToken,
    idUser: signin.idUser,
    typeUser: signin.type,
});

const mapDispatchToProps = dispatch => ({
    tokenPushNotifications: (token, typeUser, idUser) => dispatch(setTokenPushNotificationsRequest(token, typeUser, idUser))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withTheme(Home)));