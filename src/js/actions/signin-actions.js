import Api from '../services/api';

export const SIGNIN_ASYNC_REQUEST_STARTED = 'LOGIN_ASYNC_REQUEST_STARTED';
export const signinCostumerAsyncRequestStarted = () => ({
    type: SIGNIN_ASYNC_REQUEST_STARTED,
});

export const SIGNIN_COSTUMER_SUCCESS = 'SIGNIN_COSTUMER_SUCCESS';
export const signinCostumerSuccess = data => ({
    type: SIGNIN_COSTUMER_SUCCESS,
    data
});

export const SIGNIN_COSTUMER_FAILED = 'SIGNIN_COSTUMER_FAILED';
export const signinCostumerFailed = (error) => ({
    type: SIGNIN_COSTUMER_FAILED,
    error
});

export const SIGNIN_COSTUMER_REQUEST = 'SIGNIN_REQUEST';
export const signinCostumerRequest = (signinBody, type) => {
    return dispatch => {
        dispatch(signinCostumerAsyncRequestStarted());
        Api.post(`auth/signin${type}`, signinBody)
            .then(({ data }) => {
                dispatch(signinCostumerSuccess(data));
            })
            .catch(({ message }) => {
                dispatch(signinCostumerFailed(message));
            });
    };
};

export const SIGNOUT_REQUEST = 'SIGNOUT_REQUEST';
export const signOut = () => ({
    type: SIGNOUT_REQUEST
})

export const CHANGE_SIGNIN_TYPE = 'CHANGE_SIGNIN_TYPE';
export const changeSigninType = newType => ({
    type: CHANGE_SIGNIN_TYPE,
    newType
})