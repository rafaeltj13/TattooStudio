import Api from '../services/api';
import { getScheduleId } from '../store/localStorage';

export const APPOINTMENT_ASYNC_REQUEST_STARTED = 'APPOINTMENT_ASYNC_REQUEST_STARTED';
export const appointmentAsyncRequestStarted = () => ({
    type: APPOINTMENT_ASYNC_REQUEST_STARTED,
});

export const CREATE_APPOINTMENT_SUCCESS = 'CREATE_APPOINTMENT_SUCCESS';
export const createAppointmentSuccess = data => ({
    type: CREATE_APPOINTMENT_SUCCESS,
    data
});

export const CREATE_APPOINTMENT_FAILED = 'CREATE_APPOINTMENT_FAILED';
export const createAppointmentFailed = error => ({
    type: CREATE_APPOINTMENT_FAILED,
    error
});

export const CREATE_APPOINTMENT_REQUEST = 'CREATE_TATTOO_REQUEST';
export const createAppointmentRequest = appointmentBody => {
    return dispath => {
        dispath(appointmentAsyncRequestStarted());

        Api.post('appointments', appointmentBody)
            .then(({ data }) => {
                dispath(createAppointmentSuccess(data))
            })
            .catch(({ message }) => {
                dispath(createAppointmentFailed(message))
            });
    };
};

export const GET_APPOINTMENTS_SUCCESS = 'GET_APPOINTMENTS_SUCCESS';
export const getAppointmentsSuccess = data => ({
    type: GET_APPOINTMENTS_SUCCESS,
    data
});

export const GET_APPOINTMENTS_FAILED = 'GET_APPOINTMENTS_FAILED';
export const getAppointmentsFailed = error => ({
    type: GET_APPOINTMENTS_FAILED,
    error
});

export const GET_APPOINTMENTS_REQUEST = 'GET_APPOINTMENTS_REQUEST';
export const getAppointmentsRequest = () => {
    return dispath => {
        dispath(appointmentAsyncRequestStarted());

        Api.get(`/schedules/${getScheduleId()}`)
            .then(({ data }) => {
                dispath(getAppointmentsSuccess(data.appointments))
            })
            .catch(({ message }) => {
                dispath(getAppointmentsFailed(message))
            });
    };
};

export const SET_APPOINTMENT_DATA = 'SET_APPOINTMENT_DATA';
export const setAppointmentData = data => ({
    type: SET_APPOINTMENT_DATA,
    data
});

export const GET_APPOINTMENT_SUCCESS = 'GET_APPOINTMENT_SUCCESS';
export const getAppointmentSuccess = data => ({
    type: GET_APPOINTMENT_SUCCESS,
    data
});

export const GET_APPOINTMENT_FAILED = 'GET_APPOINTMENT_FAILED';
export const getAppointmentFailed = error => ({
    type: GET_APPOINTMENT_FAILED,
    error
});

export const GET_APPOINTMENT_REQUEST = 'GET_APPOINTMENT_REQUEST';
export const getAppointmentRequest = appointmentId => {
    return dispatch => {
        dispatch(appointmentAsyncRequestStarted());

        Api.get(`/appointments/${appointmentId}`)
            .then(({ data }) => {
                dispatch(getAppointmentSuccess(data))
            })
            .catch(({ message }) => {
                dispatch(getAppointmentFailed(message))
            });
    };
};

export const EDIT_APPOINTMENT_SUCCESS = 'EDIT_APPOINTMENT_SUCCESS';
export const editAppointmentSuccess = data => ({
    type: EDIT_APPOINTMENT_SUCCESS,
    data
});

export const EDIT_APPOINTMENT_FAILED = 'EDIT_APPOINTMENT_FAILED';
export const editAppointmentFailed = error => ({
    type: EDIT_APPOINTMENT_FAILED,
    error
});

export const EDIT_APPOINTMENT_REQUEST = 'EDIT_APPOINTMENT_REQUEST';
export const editAppointmentRequest = (appointmentId, appointmentBody) => {
    return dispatch => {
        dispatch(appointmentAsyncRequestStarted());

        Api.patch(`/appointments/${appointmentId}`, appointmentBody)
            .then(({ data }) => {
                dispatch(editAppointmentSuccess(data))
            })
            .catch(({ message }) => {
                dispatch(editAppointmentFailed(message))
            });
    };
};

export const GET_AVAILABLE_HOURS_SUCCESS = 'GET_AVAILABLE_HOURS_SUCCESS';
export const getAvailableHoursSuccess = data => ({
    type: GET_AVAILABLE_HOURS_SUCCESS,
    data
});

export const GET_AVAILABLE_HOURS_FAILED = 'GET_AVAILABLE_HOURS_FAILED';
export const getAvailableHoursFailed = error => ({
    type: GET_AVAILABLE_HOURS_FAILED,
    error
});

export const GET_AVAILABLE_HOURS_REQUEST = 'GET_AVAILABLE_HOURS_REQUEST';
export const getAvailableHours = (artistId, date, interval) => {
    return dispatch => {
        dispatch(appointmentAsyncRequestStarted());

        Api.get(`/artists/${artistId}/availableHours?date=${date}&interval=${interval}`)
            .then(({ data }) => {
                dispatch(getAvailableHoursSuccess(data))
            })
            .catch(({ message }) => {
                dispatch(getAvailableHoursFailed(message))
            });
    };
};

export const SET_SELECTED_ARTIST = 'SET_SELECTED_ARTIST';
export const setSelectedArtist = artist => ({
    type: SET_SELECTED_ARTIST,
    artist,
});