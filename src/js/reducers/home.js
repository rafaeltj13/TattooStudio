import {
    HOME_ASYNC_REQUEST_STARTED,
    GET_LAST_VISITED_ARTIST_SUCCESS,
    GET_LAST_VISITED_ARTIST_FAILED,
    GET_FEATURED_ARTISTS_SUCCESS,
    GET_FEATURED_ARTISTS_FAILED,
} from '../actions/home-actions';

const initialState = {
    loading: false,
    error: null,
    lastArtistVisited: {},
    featuredArtists: [],
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case HOME_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case GET_LAST_VISITED_ARTIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                lastArtistVisited: action.data,
            };

        case GET_LAST_VISITED_ARTIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                lastArtistVisited: {},
            };

        case GET_FEATURED_ARTISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                featuredArtists: action.data,
            };

        case GET_FEATURED_ARTISTS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                featuredArtists: [],
            };

        default:
            return state;
    }
};

export default home;