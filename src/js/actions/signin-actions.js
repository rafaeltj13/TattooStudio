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
                dispatch(signinSuccess
                    (data));
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