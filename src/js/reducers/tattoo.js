import {
    TATTOO_ASYNC_REQUEST_STARTED,
    SHOW_TATTOO_DIALOG,
    CREATE_TATTOO_SUCCESS,
    CREATE_TATTOO_FAILED,
    SHOW_TATTOO_LIST_DIALOG,
} from '../actions/tattoo-actions';

const initialState = {
    loading: false,
    error: null,
    openForm: false,
    openList: false,
    tattoo: {},
};

const tattoo = (state = initialState, action) => {
    switch (action.type) {
        case TATTOO_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case SHOW_TATTOO_DIALOG:
            return {
                ...state,
                openForm: action.show,
            }

        case CREATE_TATTOO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tattoo: action.data,
            };

        case CREATE_TATTOO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case SHOW_TATTOO_LIST_DIALOG:
            return {
                ...state,
                openList: action.show,
            };


        default:
            return state;
    }
};

export default tattoo;