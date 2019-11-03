import Api from '../services/api';

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
export const getFeaturedArtistsRequest = () => {
    return dispath => {
        dispath(homeAsyncRequestStarted());

        Api.get(`artists/featured`)
            .then(({ data }) => {
                dispath(getFeaturedArtistsSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getFeaturedArtistsFailed(message))
            });
    };
};