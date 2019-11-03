/* eslint-disable import/first */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Button from '../custom/button/CustomButton';
import { getLastVisitedArtistRequest, getFeaturedArtistsRequest } from '../../actions/home-actions';;
import { setTokenPushNotificationsRequest } from '../../actions/signin-actions';
import { askForNotifications } from '../../utils/push-notifications';
import { createNotification } from '../../actions/notification-actions';
import { getId } from '../../store/localStorage';
import { SIGNIN } from '../../utils/constants';
import Typography from '@material-ui/core/Typography';
import CustomContainer from '../custom/pages/CustomContainer';
import CustomSearchItem from '../custom/search/CustomSearchItem';
import CustomSearchList from '../custom/search/CustomSearchList';

const Home = props => {
    const {
        loading,
        error,
        tokenPushNotifications,
        idUser,
        typeUser,
        getLastVisitedArtist,
        lastArtistVisited,
        getFeaturedArtists,
        featuredArtists,
        newNotification,
    } = props;

    useEffect(
        () => {
            getLastVisitedArtist();
            getFeaturedArtists();
        },
        []
    );

    useEffect(
        () => {
            if (!loading) {
                if (error) {
                    newNotification({
                        variant: 'error',
                        message: error
                    });
                }
            }
        },
        [loading]
    );

    askForNotifications()
        .then(token => tokenPushNotifications(token, typeUser, idUser));

    const gotoArtistPage = id => props.history.push(`/profile/artist/${id}`);

    const renderLastVisited = () => {
        if (!lastArtistVisited.name) return <Typography variant="subtitle2" gutterBottom> Nenhum tatuador visitado. </Typography>

        return (
            <CustomSearchItem
                value={lastArtistVisited}
                type={'artist'}
                handleClick={gotoArtistPage}
            />
        );
    };

    const renderFeaturedArtists = () => {
        if (featuredArtists.length === 0) return <Typography variant="subtitle2" gutterBottom> Nenhum tatuador encontrado. </Typography>

        return (
            <CustomSearchList
                data={featuredArtists}
                type={'artist'}
                handleClick={gotoArtistPage}
            />
        );
    };

    return (
        <CustomContainer>
            <Typography variant="h5" gutterBottom> Bem vindo ao {SIGNIN.TITLE}! </Typography>
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => props.history.push(`/search`)}
                startIcon={<SearchIcon />}
            >
                Procurar por tatuador...
            </Button>
            <Typography variant="body1" gutterBottom> Último tatuador visitado </Typography>
            {renderLastVisited()}
            <Typography variant="body1" gutterBottom> Tatuadores famosos no TattooStudio </Typography>
            {renderFeaturedArtists()}
        </CustomContainer>
    )
};

const mapStateToProps = ({ home, signin }) => ({
    loading: home.loading,
    error: home.error,
    lastArtistVisited: home.lastArtistVisited,
    featuredArtists: home.featuredArtists,
    pushNotificationToken: signin.pushNotificationToken,
    idUser: signin.idUser,
    typeUser: signin.type,
});

const mapDispatchToProps = dispatch => ({
    tokenPushNotifications: (token, typeUser, idUser) => dispatch(setTokenPushNotificationsRequest(token, typeUser, idUser)),
    getLastVisitedArtist: () => dispatch(getLastVisitedArtistRequest(getId())),
    getFeaturedArtists: () => dispatch(getFeaturedArtistsRequest()),
    newNotification: payload => dispatch(createNotification(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withTheme(Home)));