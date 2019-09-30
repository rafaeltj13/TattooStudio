import {
    SIGNIN_ASYNC_REQUEST_STARTED,
    SIGNIN_COSTUMER_SUCCESS,
    SIGNIN_COSTUMER_FAILED,
    SIGNOUT_REQUEST,
    CHANGE_SIGNIN_TYPE
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

        case SIGNIN_COSTUMER_SUCCESS:
            saveState({
                sessionToken: action.data.token,
                username: action.data.username,
                idUser: action.data.id,
                type: state.type,
            })

            return {
                ...state,
                loading: false,
                username: action.data.username,
                idUser: action.data.id,
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