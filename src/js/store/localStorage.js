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
        console.log('saveState')
        const signin = JSON.stringify({
            token: `Bearer ${signinState.sessionToken}`,
            username: signinState.username,
            idUser: signinState.idUser,
            type: signinState.type,
        });
        localStorage.setItem('signin', signin);
    } catch (err) {
        return undefined;
    }
};

export const getId = () => {
    return JSON.parse(localStorage.getItem('signin')).idUser;
};