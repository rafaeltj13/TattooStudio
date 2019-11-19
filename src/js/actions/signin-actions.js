import Api from '../services/api';

export const SIGNIN_ASYNC_REQUEST_STARTED = 'SIGNIN_ASYNC_REQUEST_STARTED';
export const signinAsyncRequestStarted = () => ({
    type: SIGNIN_ASYNC_REQUEST_STARTED,
});

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const signinSuccess = data => ({
    type: SIGNIN_SUCCESS,
    data
});

export const SIGNIN_FAILED = 'SIGNIN_FAILED';
export const signinFailed = (error) => ({
    type: SIGNIN_FAILED,
    error
});

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const signinRequest = (signinBody, type) => {
    return dispatch => {
        dispatch(signinAsyncRequestStarted());
        Api.post(`auth/signin${type}`, signinBody)
            .then(({ data }) => {
                dispatch(signinSuccess(data));
            })
            .catch(({ message }) => {
                dispatch(signinFailed(message));
            });
    };
};

export const CHANGE_SIGNIN_TYPE = 'CHANGE_SIGNIN_TYPE';
export const changeSigninType = newType => ({
    type: CHANGE_SIGNIN_TYPE,
    newType
})

export const SIGNOUT = 'SIGNOUT';
export const signoutRequest = () => ({
    type: SIGNOUT,
});

export const SET_TOKEN_PUSH_NOTIFICATIONS_SUCCESS = 'SET_TOKEN_PUSH_NOTIFICATIONS_SUCCESS';
export const setTokenPushNotificationsSuccess = token => ({
    type: SET_TOKEN_PUSH_NOTIFICATIONS_SUCCESS,
    token
});

export const SET_TOKEN_PUSH_NOTIFICATIONS_FAILED = 'SET_TOKEN_PUSH_NOTIFICATIONS_FAILED';
export const setTokenPushNotificationsFailed = error => ({
    type: SET_TOKEN_PUSH_NOTIFICATIONS_FAILED,
    error
});

export const SET_TOKEN_PUSH_NOTIFICATIONS_REQUEST = 'SET_TOKEN_PUSH_NOTIFICATIONS_REQUEST';
export const setTokenPushNotificationsRequest = (token, typeUser, idUser) => {
    return dispatch => {
        dispatch(signinAsyncRequestStarted());

        Api.patch(`${typeUser}s/${idUser}`, { notificationToken: token })
            .then(() => {
                dispatch(setTokenPushNotificationsSuccess(token));
            })
            .catch(({ message }) => {
                dispatch(setTokenPushNotificationsFailed(message));
            });
    };
};