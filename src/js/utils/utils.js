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
    newDate.setHours(0, 0, 0, 0);
    return newDate;
}

export const formatOwner = values => {
    const studio = {
        name: values.studioName,
        address: values.address,
        phone: values.studioPhone,
        information: values.information,
        workTime: {
            week: {
                morning: [values.weekMoringStart, values.weekMoringEnd],
                afternoon: [values.weekAfternoonStart, values.weekAfternoonEnd],
                night: [values.weekNightStart, values.weekNightEnd]
            },
            saturday: {
                morning: [values.saturdayMoringStart, values.saturdayMoringEnd],
                afternoon: [values.saturdayAfternoonStart, values.saturdayAfternoonEnd],
                night: [values.saturdayNightStart, values.saturdayNightEnd]
            },
            sunday: {
                morning: [values.sundayMoringStart, values.sundayMoringEnd],
                afternoon: [values.sundayAfternoonStart, values.sundayAfternoonEnd],
                night: [values.sundayNightStart, values.sundayNightEnd]
            },
        }
    };

    const owner = {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
        name: values.name,
        email: values.email,
        phone: values.phone,
        age: values.age,
        gender: values.gender,
        studio: studio,
    };

    return owner;
};