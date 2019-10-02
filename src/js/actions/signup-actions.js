import Api from '../services/api';

export const SIGNUP_ASYNC_REQUEST_STARTED = 'SIGNUP_ASYNC_REQUEST_STARTED';
export const signupAsyncRequestStarted = () => ({
    type: SIGNUP_ASYNC_REQUEST_STARTED,
});

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const createUserSuccess = data => ({
    type: CREATE_USER_SUCCESS,
    data
});

export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const createUserFailed = error => ({
    type: CREATE_USER_FAILED,
    error
});

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = (signupBody, type) => {
    return dispatch => {
        dispatch(signupAsyncRequestStarted());

        Api.post(`${type}s`, signupBody)
            .then(({ data }) => {
                dispatch(createUserSuccess(data))
            })
            .catch(({ message }) => {
                dispatch(createUserFailed(message))
            });
    };
};