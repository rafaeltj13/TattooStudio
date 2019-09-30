import {
    TATTOO_ASYNC_REQUEST_STARTED,
    SHOW_TATTOO_DIALOG,
    CREATE_TATTOO_SUCCESS,
    CREATE_TATTOO_FAILED
} from '../actions/tattoo-actions';

const initialState = {
    loading: false,
    error: null,
    openForm: false,
    tattoo: {}
};

const appointment = (state = initialState, action) => {
    switch (action.type) {
        case TATTOO_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case SHOW_TATTOO_DIALOG:
            return {
                ...state,
                openForm: action.show
            }

        case CREATE_TATTOO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                tattoo: action.data
            };

        case CREATE_TATTOO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        default:
            return state;
    }
};

export default appointment;