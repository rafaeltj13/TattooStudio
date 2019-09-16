import Api from '../services/api';

export const SIGNUP_ASYNC_REQUEST_STARTED = 'SIGNUP_ASYNC_REQUEST_STARTED';
export const signupCostumerAsyncRequestStarted = () => ({
    type: SIGNUP_ASYNC_REQUEST_STARTED,
});

export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const createUserSuccess = data => ({
    type: CREATE_CUSTOMER_SUCCESS,
    data
});

export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';
export const createUserFailed = error => ({
    type: CREATE_USER_FAILED,
    error
});

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const createUserRequest = (signupBody, type) => {
    return dispath => {
        dispath(signupCostumerAsyncRequestStarted);

        Api.post(type, signupBody)
            .then(({ data }) => {
                dispath(createUserSuccess(data))
            })
            .catch(({ message }) => {
                dispath(createUserFailed(message))
            });
    };
};