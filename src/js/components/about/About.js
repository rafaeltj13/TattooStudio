import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import { getUserDetailsRequest } from '../../actions/about-actions';
import { signoutRequest } from '../../actions/signin-actions';
import { getId } from '../../store/localStorage';
import { GENERAL, TATTOO } from '../../utils/constants';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AppsIcon from '@material-ui/icons/Apps';
import Divider from '@material-ui/core/Divider';
import CustomContainer from '../custom/pages/CustomContainer';

const About = props => {
    const { getUserDetails, userDetails, typeUser, signout } = props;

    useEffect(
        () => {
            getUserDetails(typeUser);
        },
        []
    );

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
                <ListItem button>
                    <ListItemIcon>
                        <AppsIcon />
                    </ListItemIcon>
                    <ListItemText primary={TATTOO.MY_TATTOOS} />
                </ListItem>
                <Divider light />
                <ListItem button onClick={signout}>
                    <ListItemIcon>
                        <HighlightOffIcon />
                    </ListItemIcon>
                    <ListItemText primary={GENERAL.PASSWORD} />
                </ListItem>
                <Divider light />
            </List>
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
    signout: () => () => dispatch(signoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTheme(About)));