import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getUserDetailsRequest } from '../../actions/about-actions';
import { signoutRequest } from '../../actions/signin-actions';
import { showTattooListDialog } from '../../actions/tattoo-actions';
import { getId } from '../../store/localStorage';
import { GENERAL, TATTOO } from '../../utils/constants';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AppsIcon from '@material-ui/icons/Apps';
import Divider from '@material-ui/core/Divider';
import CustomContainer from '../custom/pages/CustomContainer';
import TattooList from '../tattoo/TattooList';

const About = props => {
    const { getUserDetails, userDetails, typeUser, signout, showTattooList } = props;

    useEffect(
        () => {
            getUserDetails(typeUser);
        },
        []
    );

    const logout = () => {
        signout();
        props.history.push('/signin');
    };

    return (
        <CustomContainer>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userDetails.name} secondary={`${userDetails.age}, ${userDetails.gender}`} />
                </ListItem>
                <Divider />
                {
                    typeUser !== 'owner' ?
                        <ListItem button onClick={showTattooList}>
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary={TATTOO.MY_TATTOOS} />
                        </ListItem>
                        : <Fragment />
                }
                <Divider light />
                <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <HighlightOffIcon />
                    </ListItemIcon>
                    <ListItemText primary={GENERAL.SIGNOUT} />
                </ListItem>
                <Divider light />
            </List>
            <TattooList title={TATTOO.MY_TATTOOS} typeUser={typeUser} idUser={getId()} />
        </CustomContainer>
    )
};

const mapStateToProps = ({ about, signin }) => ({
    loading: about.loading,
    error: about.error,
    userDetails: about.user,
    typeUser: signin.type
});

const mapDispatchToProps = dispatch => ({
    getUserDetails: typeUser => dispatch(getUserDetailsRequest(getId(), typeUser)),
    signout: () => dispatch(signoutRequest()),
    showTattooList: () => dispatch(showTattooListDialog(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(About)));