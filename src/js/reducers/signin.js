import {
    SIGNIN_ASYNC_REQUEST_STARTED,
    SIGNIN_COSTUMER_SUCCESS,
    SIGNIN_COSTUMER_FAILED,
    SIGNOUT_REQUEST
} from '../actions/signin-actions';

const initialState = {
    loading: false,
    error: null,
    username: '',
    sessionToken: null,
    type: 'Customer'
};

const signin = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case SIGNIN_COSTUMER_SUCCESS:
            return {
                ...state,
                loading: false,
                username: action.data.username,
                error: null,
                sessionToken: action.data.token,
            };

        case SIGNIN_COSTUMER_FAILED:
            return {
                ...state,
                loading: false,
                username: '',
                error: action.error,
            };

        case SIGNOUT_REQUEST:
            return {
                ...state,
                loading: false,
                username: '',
                error: null,
                sessionToken: null,
            };

        default:
            return state;
    }
};

export default signin;