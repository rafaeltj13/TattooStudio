import {
    ABOUT_ASYNC_REQUEST_STARTED,
    GET_USER_DEATILS_SUCCESS,
    GET_USER_DEATILS_FAILED,
} from '../actions/about-actions';

const initialState = {
    loading: false,
    error: null,
    user: {},
};

const about = (state = initialState, action) => {
    switch (action.type) {
        case ABOUT_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case GET_USER_DEATILS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                user: action.data,
            };

        case GET_USER_DEATILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                user: {},
            };

        default:
            return state;
    }
};

export default about;