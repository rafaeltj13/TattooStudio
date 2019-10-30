import {
    PROFILE_ASYNC_REQUEST_STARTED,
    GET_ARTISTS_SUCCESS,
    GET_ARTISTS_FAILED,
    GET_SELECTED_ARTIST_SUCCESS,
    GET_SELECTED_ARTIST_FAILED
} from '../actions/profile-actions';

const initialState = {
    loading: false,
    error: null,
    artists: [],
    selectedArtist: {}
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
                artists: action.data
            };

        case GET_ARTISTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                artists: []
            };

        case GET_SELECTED_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                selectedArtist: action.data
            };

        case GET_SELECTED_ARTIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                selectedArtist: {}
            };

        default:
            return state;
    }
};

export default search;