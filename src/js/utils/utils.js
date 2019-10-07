export const validateAppointment = appointment => {
    return appointment && appointment.artist && appointment.customer && appointment.customer && appointment.status;
};