import {
    APPOINTMENT_ASYNC_REQUEST_STARTED,
} from '../actions/appointment-actions';

const initialState = {
    loading: false,
    error: null,
};

const signup = (state = initialState, action) => {
    switch (action.type) {
        case APPOINTMENT_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};

export default signup;