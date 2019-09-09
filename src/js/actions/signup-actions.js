import Api from '../services/api';

export const SIGNUP_ASYNC_REQUEST_STARTED = 'SIGNUP_ASYNC_REQUEST_STARTED';
export const signupCostumerAsyncRequestStarted = () => ({
    type: SIGNUP_ASYNC_REQUEST_STARTED,
});

export const CREATE_CUSTOMER_SUCCESS = 'CREATE_CUSTOMER_SUCCESS';
export const createCustomerSuccess = data => ({
    type: CREATE_CUSTOMER_SUCCESS,
    data
});

export const CREATE_CUSTOMER_FAILED = 'CREATE_CUSTOMER_FAILED';
export const createCustomerFailed = error => ({
    type: CREATE_CUSTOMER_FAILED,
    error
});

export const CREATE_CUSTOMER_REQUEST = 'CREATE_CUSTOMER_REQUEST';
export const createCustomerRequest = (signupBody, type) => {
    return dispath => {
        dispath(signupCostumerAsyncRequestStarted);

        Api.post(type, signupBody)
            .then(({ data }) => {
                dispath(createCustomerSuccess(data))
            })
            .catch(({ message }) => {
                dispath(createCustomerFailed(message))
            });
    };
};