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

        const queryUrl = searchQuery ? `?query=${searchQuery}` : ''; 

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