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
    EDIT_APPOINTMENT_FAILED,
    GET_AVAILABLE_HOURS_SUCCESS,
    GET_AVAILABLE_HOURS_FAILED,
    SET_SELECTED_ARTIST
} from '../actions/appointment-actions';

const initialState = {
    loading: false,
    error: null,
    selectedAppointment: {},
    selectedArtist: {},
    appointments: [],
    availableHours: []
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
                loading: false,
                error: '',
                appointments: action.data,
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
                error: '',
                selectedAppointment: action.data,
            };

        case GET_APPOINTMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case EDIT_APPOINTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
            };

        case EDIT_APPOINTMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case GET_AVAILABLE_HOURS_SUCCESS:
            return {
                ...state,
                loading: false,
                availableHours: action.data
            };

        case GET_AVAILABLE_HOURS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                availableHours: []
            };

        case SET_SELECTED_ARTIST:
            return {
                ...state,
                selectedArtist: action.artist
            };

        default:
            return state;
    }
};

export default appointment;