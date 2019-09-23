import {
    TATTOO_ASYNC_REQUEST_STARTED,
} from '../actions/tattoo-actions';

const initialState = {
    loading: false,
    error: null,
};

const appointment = (state = initialState, action) => {
    switch (action.type) {
        case TATTOO_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};

export default appointment;