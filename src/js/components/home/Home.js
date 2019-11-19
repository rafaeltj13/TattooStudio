/* eslint-disable import/first */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTheme } from '@material-ui/core';
import Button from '../custom/button/CustomButton';
import { getLastVisitedArtistRequest, getFeaturedArtistsRequest, getPendingArtistsRequest, respondArtistRequest } from '../../actions/home-actions';;
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
        getPendingArtists,
        pendingArtists,
        respondArtist,
    } = props;

    const [render, setRender] = useState(false);

    useEffect(
        () => {
            getFeaturedArtists(typeUser);
            if (typeUser === 'owner') getPendingArtists();
            else if (typeUser === 'customer') getLastVisitedArtist();
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

    const respondPendingArtist = (response, artistId) => {
        respondArtist({ response, artistId })
    }

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

    const renderPendingArtists = () => {
        if (pendingArtists.length === 0) return <Typography variant="subtitle2" gutterBottom> Nenhum tatuador pendente. </Typography>

        return (
            <CustomSearchList
                data={pendingArtists}
                type={'artist'}
                handleClick={gotoArtistPage}
                details
                detailsAcion={respondPendingArtist}
            />
        );
    };

    return (
        <CustomContainer>
            <Typography variant="h5" gutterBottom> Bem vindo ao {SIGNIN.TITLE}! </Typography>
            {typeUser === 'owner' ? <Typography variant="body1" gutterBottom> Tatuadores pendentes </Typography> :
                <Typography variant="body1" gutterBottom> Último tatuador visitado </Typography>}
            {typeUser === 'owner' ? renderPendingArtists() : renderLastVisited()}
            {typeUser === 'owner' ? <Typography variant="body1" gutterBottom> Meus tatuadores </Typography> :
                <Typography variant="body1" gutterBottom> Tatuadores famosos no TattooStudio </Typography>}
            {renderFeaturedArtists()}
            {
                typeUser === 'owner' ||
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => props.history.push(`/search`)}
                >
                    Procurar por tatuador...
            </Button>
            }

        </CustomContainer>
    )
};

const mapStateToProps = ({ home, signin }) => ({
    loading: home.loading,
    error: home.error,
    lastArtistVisited: home.lastArtistVisited,
    featuredArtists: home.featuredArtists,
    pendingArtists: home.pendingArtists,
    pushNotificationToken: signin.pushNotificationToken,
    idUser: signin.idUser,
    typeUser: signin.type,
});

const mapDispatchToProps = dispatch => ({
    tokenPushNotifications: (token, typeUser, idUser) => dispatch(setTokenPushNotificationsRequest(token, typeUser, idUser)),
    getLastVisitedArtist: () => dispatch(getLastVisitedArtistRequest(getId())),
    getFeaturedArtists: typeUser => dispatch(getFeaturedArtistsRequest(typeUser)),
    getPendingArtists: () => dispatch(getPendingArtistsRequest(getId())),
    respondArtist: responseBody => dispatch(respondArtistRequest(getId(), responseBody)),
    newNotification: payload => dispatch(createNotification(payload)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withTheme(Home)));