import Api from '../services/api';

export const SIGNIN_ASYNC_REQUEST_STARTED = 'LOGIN_ASYNC_REQUEST_STARTED';
export const signinCostumerAsyncRequestStarted = () => ({
    type: SIGNIN_ASYNC_REQUEST_STARTED,
});

export const SIGNIN_COSTUMER_SUCCESS = 'SIGNIN_COSTUMER_SUCCESS';
export const signinCostumerSuccess = ({ status, data }) => ({
    type: SIGNIN_COSTUMER_SUCCESS,
    status,
    data,
});

export const SIGNIN_COSTUMER_FAILED = 'SIGNIN_COSTUMER_FAILED';
export const signinCostumerFailed = (error) => ({
    type: SIGNIN_COSTUMER_FAILED,
    error
});

export const SIGNIN_COSTUMER_REQUEST = 'SIGNIN_REQUEST';
export const signinCostumerRequest = (body, type) => {
    console.log(body)
    return dispatch => {
        dispatch(signinCostumerAsyncRequestStarted());
        Api.post(`/signin${type}`, body)
            .then(res => {
                console.log(res)
                dispatch(signinCostumerSuccess(res));
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