import {
    SIGNIN_ASYNC_REQUEST_STARTED,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED,
    SIGNOUT,
    CHANGE_SIGNIN_TYPE,
} from '../actions/signin-actions';

import { saveState } from '../store/localStorage';

const initialState = {
    loading: false,
    error: null,
    username: '',
    idUser: '',
    sessionToken: null,
    type: 'customer'
};

const signin = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case SIGNIN_SUCCESS:
            saveState({
                sessionToken: action.data.token,
                username: action.data.username,
                idUser: action.data.id,
                type: action.data.type,
            })

            return {
                ...state,
                loading: false,
                username: action.data.username,
                idUser: action.data.id,
                error: null,
                sessionToken: action.data.token,
                type: action.data.type
            };

        case SIGNIN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                username: '',
                idUser: '',
                sessionToken: '',
            };

        case SIGNOUT:
            saveState({
                sessionToken: '',
                username: '',
                idUser: '',
                type: 'customer',
            })

            return {
                ...state,
                loading: false,
                error: null,
                username: '',
                idUser: '',
                sessionToken: '',
                type: ''
            };

        case CHANGE_SIGNIN_TYPE:
            return {
                ...state,
                type: action.newType
            }

        default:
            return state;
    }
};

export default signin;