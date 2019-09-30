import Api from '../services/api';

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
export const getAppointmentsRequest = (idUser, typeUser) => {
    return dispath => {
        dispath(appointmentAsyncRequestStarted());

        Api.get(`/appointments/${typeUser}/${idUser}`)
            .then(({ data }) => {
                dispath(getAppointmentsSuccess(data))
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