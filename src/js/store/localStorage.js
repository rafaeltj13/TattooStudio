export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('signin');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = signinState => {
    try {
        const signin = JSON.stringify({
            sessionToken: `Bearer ${signinState.sessionToken}`,
            username: signinState.username,
            idUser: signinState.idUser,
            type: signinState.type,
            scheduleId: signinState.scheduleId
        });
        localStorage.setItem('signin', signin);
    } catch (err) {
        return undefined;
    }
};

export const getId = () => {
    return JSON.parse(localStorage.getItem('signin')).idUser;
};

export const getScheduleId = () => {
    return JSON.parse(localStorage.getItem('signin')).scheduleId;
}