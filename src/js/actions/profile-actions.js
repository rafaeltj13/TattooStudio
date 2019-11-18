import Api from '../services/api';

export const PROFILE_ASYNC_REQUEST_STARTED = 'PROFILE_ASYNC_REQUEST_STARTED';
export const profileAsyncRequestStarted = () => ({
    type: PROFILE_ASYNC_REQUEST_STARTED,
});

export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const getArtistsSuccess = data => ({
    type: GET_ARTISTS_SUCCESS,
    data
});

export const GET_ARTISTS_FAILED = 'GET_ARTISTS_FAILED';
export const getArtistsFailed = error => ({
    type: GET_ARTISTS_FAILED,
    error
});

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const getArtistsRequest = searchQuery => {
    return dispath => {
        dispath(profileAsyncRequestStarted());

        const queryUrl = searchQuery ? `?name=${searchQuery}` : '';

        Api.get(`artists${queryUrl}`)
            .then(({ data }) => {
                dispath(getArtistsSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getArtistsFailed(message))
            });
    };
};

export const GET_SELECTED_ARTIST_SUCCESS = 'GET_SELECTED_ARTIST_SUCCESS';
export const getSelectedArtistSuccess = data => ({
    type: GET_SELECTED_ARTIST_SUCCESS,
    data
});

export const GET_SELECTED_ARTIST_FAILED = 'GET_SELECTED_ARTIST_FAILED';
export const getSelectedArtistFailed = error => ({
    type: GET_SELECTED_ARTIST_FAILED,
    error
});

export const GET_SELECTED_ARTIST_REQUEST = 'GET_SELECTED_ARTIST_REQUEST';
export const getSelectedArtistRequest = idArtist => {
    return dispath => {
        dispath(profileAsyncRequestStarted());

        Api.get(`artists/${idArtist}`)
            .then(({ data }) => {
                dispath(getSelectedArtistSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getSelectedArtistFailed(message))
            });
    };
};

export const GET_USER_TATTOOS_SUCCESS = 'GET_USER_TATTOOS_SUCCESS';
export const getUserTattoosSuccess = data => ({
    type: GET_USER_TATTOOS_SUCCESS,
    data
});

export const GET_USER_TATTOOS_FAILED = 'GET_USER_TATTOOS_FAILED';
export const getUserTattoosFailed = error => ({
    type: GET_USER_TATTOOS_FAILED,
    error
});

export const GET_USER_TATTOOS_REQUEST = 'GET_USER_TATTOOS_REQUEST';
export const getUserTattoosRequest = (id, type) => {
    return dispatch => {
        dispatch(profileAsyncRequestStarted());
        Api.get(`${type}s/${id}/tattoo`)
            .then(({ data }) => {
                dispatch(getUserTattoosSuccess(data));
            })
            .catch(({ message }) => {
                dispatch(getUserTattoosFailed(message));
            });
    };
};

export const SET_LAST_VISITED_SUCCESS = 'SET_LAST_VISITED_SUCCESS';
export const setLastVisitedSuccess = data => ({
    type: SET_LAST_VISITED_SUCCESS,
    data
});

export const SET_LAST_VISITED_FAILED = 'SET_LAST_VISITED_FAILED';
export const setLastVisitedFailed = error => ({
    type: SET_LAST_VISITED_FAILED,
    error
});

export const SET_LAST_VISITED_REQUEST = 'GET_USER_TATTOOS_REQUEST';
export const setLastVisitedRequest = (customerId, lastArtistVisited) => {
    return dispatch => {
        dispatch(profileAsyncRequestStarted());

        Api.patch(`customers/${customerId}`, { lastArtistVisited })
            .then(({ data }) => {
                dispatch(setLastVisitedSuccess(data));
            })
            .catch(({ message }) => {
                dispatch(setLastVisitedFailed(message));
            });
    };
};

export const GET_STUDIOS_SUCCESS = 'GET_STUDIOS_SUCCESS';
export const getStudiosSuccess = data => ({
    type: GET_STUDIOS_SUCCESS,
    data
});

export const GET_STUDIOS_FAILED = 'GET_STUDIOS_FAILED';
export const getStudiosFailed = error => ({
    type: GET_STUDIOS_FAILED,
    error
});

export const GET_STUDIOS_REQUEST = 'GET_STUDIOS_REQUEST';
export const getStudiosRequest = searchQuery => {
    return dispath => {
        dispath(profileAsyncRequestStarted());

        const queryUrl = searchQuery ? `?name=${searchQuery}` : '';

        Api.get(`studios${queryUrl}`)
            .then(({ data }) => {
                dispath(getStudiosSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getStudiosFailed(message))
            });
    };
};

export const GET_SELECTED_STUDIO_SUCCESS = 'GET_SELECTED_STUDIO_SUCCESS';
export const getSelectedStudioSuccess = data => ({
    type: GET_SELECTED_STUDIO_SUCCESS,
    data
});

export const GET_SELECTED_STUDIO_FAILED = 'GET_SELECTED_STUDIO_FAILED';
export const getSelectedStudioFailed = error => ({
    type: GET_SELECTED_STUDIO_FAILED,
    error
});

export const GET_SELECTED_STUDIO_REQUEST = 'GET_SELECTED_STUDIO_REQUEST';
export const getSelectedStudioRequest = studioId => {
    return dispath => {
        dispath(profileAsyncRequestStarted());

        Api.get(`studios/${studioId}`)
            .then(({ data }) => {
                dispath(getSelectedStudioSuccess(data))
            })
            .catch(({ message }) => {
                dispath(getSelectedStudioFailed(message))
            });
    };
};