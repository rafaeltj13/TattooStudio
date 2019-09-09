import {
    SIGNUP_ASYNC_REQUEST_STARTED,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAILED
} from '../actions/signup-actions';

const initialState = {
    loading: false,
    error: null,
};

const signup = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
            };

        case CREATE_CUSTOMER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default signup;