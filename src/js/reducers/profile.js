import {
    PROFILE_ASYNC_REQUEST_STARTED,
    GET_ARTISTS_SUCCESS,
    GET_ARTISTS_FAILED,
    GET_SELECTED_ARTIST_SUCCESS,
    GET_SELECTED_ARTIST_FAILED,
    GET_USER_TATTOOS_SUCCESS,
    GET_USER_TATTOOS_FAILED,
    SET_LAST_VISITED_SUCCESS,
    SET_LAST_VISITED_FAILED,
    GET_STUDIOS_SUCCESS,
    GET_STUDIOS_FAILED,
    GET_SELECTED_STUDIO_SUCCESS,
    GET_SELECTED_STUDIO_FAILED,
    RATE_ARTIST_SUCCESS,
    RATE_ARTIST_FAILED,
} from '../actions/profile-actions';

const initialState = {
    loading: false,
    error: null,
    artists: [],
    selectedArtist: {},
    studios: [],
    selectedStudio: {},
    tattoos: [],
};

const search = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case GET_ARTISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                artists: action.data,
                studios: [],
            };

        case GET_ARTISTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                artists: [],
                studios: [],
            };

        case GET_SELECTED_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                selectedArtist: action.data,
                selectedStudio: {},
            };

        case GET_SELECTED_ARTIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                selectedArtist: {},
                selectedStudio: {},
            };

        case GET_USER_TATTOOS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tattoos: action.data,
            };

        case GET_USER_TATTOOS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                tattoos: [],
            };

        case SET_LAST_VISITED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
            };

        case SET_LAST_VISITED_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case GET_STUDIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                studios: action.data,
                artists: [],
            };

        case GET_STUDIOS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                studios: [],
                artists: [],
            };

        case GET_SELECTED_STUDIO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                selectedStudio: action.data,
                selectedArtist: {},
            };

        case GET_SELECTED_STUDIO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                selectedStudio: {},
                selectedArtist: {},
            };

        case RATE_ARTIST_SUCCESS:
        case RATE_ARTIST_FAILED:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
};

export default search;