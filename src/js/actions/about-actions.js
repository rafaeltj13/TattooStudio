import Api from '../services/api';

export const ABOUT_ASYNC_REQUEST_STARTED = 'ABOUT_ASYNC_REQUEST_STARTED';
export const aboutAsyncRequestStarted = () => ({
    type: ABOUT_ASYNC_REQUEST_STARTED,
});

export const GET_USER_DEATILS_SUCCESS = 'GET_USER_DEATILS_SUCCESS';
export const getUserDetailsSuccess = data => ({
    type: GET_USER_DEATILS_SUCCESS,
    data
});

export const GET_USER_DEATILS_FAILED = 'GET_USER_DEATILS_FAILED';
export const getUserDetailsFailed = (error) => ({
    type: GET_USER_DEATILS_FAILED,
    error
});

export const GET_USER_DEATILS_REQUEST = 'GET_USER_DEATILS_REQUEST';
export const getUserDetailsRequest = (id, type) => {
    return dispatch => {
        dispatch(aboutAsyncRequestStarted());
        Api.get(`${type}s/${id}`)
            .then(({ data }) => {
                dispatch(getUserDetailsSuccess(data));
            })
            .catch(({ message }) => {
                dispatch(getUserDetailsFailed(message));
            });
    };
};