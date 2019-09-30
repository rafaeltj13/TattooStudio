import {
    APPOINTMENT_ASYNC_REQUEST_STARTED,
    CREATE_APPOINTMENT_SUCCESS,
    CREATE_APPOINTMENT_FAILED,
    SET_APPOINTMENT_DATA,
    GET_APPOINTMENTS_SUCCESS,
    GET_APPOINTMENTS_FAILED,
    GET_APPOINTMENT_SUCCESS,
    GET_APPOINTMENT_FAILED,
    EDIT_APPOINTMENT_SUCCESS,
    EDIT_APPOINTMENT_FAILED
} from '../actions/appointment-actions';

const initialState = {
    loading: false,
    error: null,
    selectedAppointment: {},
    appointments: []
};

const appointment = (state = initialState, action) => {
    switch (action.type) {
        case APPOINTMENT_ASYNC_REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };

        case CREATE_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: ''
            };

        case CREATE_APPOINTMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case SET_APPOINTMENT_DATA:
            return {
                ...state,
                selectedAppointment: action.data
            };

        case GET_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                appointments: action.data
            };

        case GET_APPOINTMENTS_FAILED:
            return {
                ...state,
                error: action.error,
                appointments: []
            };

        case GET_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedAppointment: action.data
            };

        case GET_APPOINTMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case EDIT_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case EDIT_APPOINTMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state;
    }
};

export default appointment;