import {
    SIGNUP_ASYNC_REQUEST_STARTED,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    GET_STUDIOS_SUCCESS,
    GET_STUDIOS_FAILED,
} from '../actions/signup-actions';

const initialState = {
    loading: false,
    error: null,
    studios: [],
};

const signup = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
            };

        case CREATE_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case GET_STUDIOS_SUCCESS:
            const availableStudios = action.data.map(studio => ({ code: studio._id, optionLabel: studio.name }));

            return {
                ...state,
                loading: false,
                error: '',
                studios: availableStudios,
            };

        case GET_STUDIOS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                studios: [],
            };

        default:
            return state;
    }
};

export default signup;