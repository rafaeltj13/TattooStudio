import Api from '../services/api';
import { getId } from '../store/localStorage';

export const HOME_ASYNC_REQUEST_STARTED = 'HOME_ASYNC_REQUEST_STARTED';
export const homeAsyncRequestStarted = () => ({
    type: HOME_ASYNC_REQUEST_STARTED,
});

export const GET_LAST_VISITED_ARTIST_SUCCESS = 'GET_LAST_VISITED_ARTIST_SUCCESS';
export const getLastVisitedArtistSuccess = data => ({
    type: GET_LAST_VISITED_ARTIST_SUCCESS,
    data
});

export const GET_LAST_VISITED_ARTIST_FAILED = 'GET_LAST_VISITED_ARTIST_FAILED';
export const getLastVisitedArtistFailed = error => ({
    type: GET_LAST_VISITED_ARTIST_FAILED,
    error
});

export const GET_LAST_VISITED_ARTIST_REQUEST = 'GET_LAST_VISITED_ARTIST_REQUEST';
export const getLastVisitedArtistRequest = customerId => {
    return dispath => {
        dispath(homeAsyncRequestStarted());

        Api.get(`customers/${customerId}/lastVisit`)
            .then(({ data }) => {
                dispath(getLastVisitedArtistSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getLastVisitedArtistFailed(message))
            });
    };
};

export const GET_FEATURED_ARTISTS_SUCCESS = 'GET_FEATURED_ARTISTS_SUCCESS';
export const getFeaturedArtistsSuccess = data => ({
    type: GET_FEATURED_ARTISTS_SUCCESS,
    data
});

export const GET_FEATURED_ARTISTS_FAILED = 'GET_FEATURED_ARTISTS_FAILED';
export const getFeaturedArtistsFailed = error => ({
    type: GET_FEATURED_ARTISTS_FAILED,
    error
});

export const GET_FEATURED_ARTISTS_REQUEST = 'GET_FEATURED_ARTISTS_REQUEST';
export const getFeaturedArtistsRequest = typeUser => {
    return dispath => {
        dispath(homeAsyncRequestStarted());

        const url = typeUser !== 'owner' ? `artists/featured` : `owners/${getId()}/artists`

        Api.get(url)
            .then(({ data }) => {
                dispath(getFeaturedArtistsSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getFeaturedArtistsFailed(message))
            });
    };
};

export const GET_PENDING_ARTISTS_SUCCESS = 'GET_PENDING_ARTISTS_SUCCESS';
export const getPendingArtistsSuccess = data => ({
    type: GET_PENDING_ARTISTS_SUCCESS,
    data
});

export const GET_PENDING_ARTISTS_FAILED = 'GET_PENDING_ARTISTS_FAILED';
export const getPendingArtistsFailed = error => ({
    type: GET_PENDING_ARTISTS_FAILED,
    error
});

export const GET_PENDING_ARTISTS_REQUEST = 'GET_PENDING_ARTISTS_REQUEST';
export const getPendingArtistsRequest = id => {
    return dispath => {
        dispath(homeAsyncRequestStarted());

        Api.get(`owners/${id}/pendingArtists`)
            .then(({ data }) => {
                dispath(getPendingArtistsSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getPendingArtistsFailed(message))
            });
    };
};

export const RESPOND_ARTIST_SUCCESS = 'RESPOND_ARTIST_SUCCESS';
export const respondArtistSuccess = data => ({
    type: RESPOND_ARTIST_SUCCESS,
    data
});

export const RESPOND_ARTIST_FAILED = 'RESPOND_ARTIST_FAILED';
export const respondArtistFailed = error => ({
    type: RESPOND_ARTIST_FAILED,
    error
});

export const RESPOND_ARTIST_REQUEST = 'RESPOND_ARTIST_REQUEST';
export const respondArtistRequest = (ownerId, responseBody) => {
    return dispath => {
        dispath(homeAsyncRequestStarted());

        Api.post(`owners/${ownerId}/acceptArtist`, responseBody)
            .then(({ data }) => {
                dispath(respondArtistSuccess(data))
            })
            .catch(({ message }) => {
                dispath(respondArtistFailed(message))
            });
    };
};