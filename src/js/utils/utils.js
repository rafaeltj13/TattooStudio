export const validateAppointment = appointment => {
    return appointment && appointment.artist && appointment.customer && appointment.customer && appointment.status;
};

export const formatAppointmentDate = appointment => {
    return `${appointment.date.getDate()}/${appointment.date.getMonth() + 1}/${appointment.date.getFullYear()
        }: ${appointment.start}-${appointment.end} hrs`;
};

export const containsDate = (dateList, dateToCheck) => {
    let contains = false;

    dateList.forEach(date => {
        if (date.date.getTime() === dateToCheck.date.getTime() && date.start === dateToCheck.start && date.end === dateToCheck.end) {
            contains = true;
            return;
        }
    })

    return contains;
};

export const createDate = () => {
    const newDate = new Date();
    newDate.setHours(0,0,0,0);
    return newDate;
}