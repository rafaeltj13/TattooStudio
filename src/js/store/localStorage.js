export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
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
        const signin = JSON.stringify(signinState);
        localStorage.setItem('signin', { username: signin.username, token: `Bearer ${signin.sessionToken}` });
    } catch (err) {
        console.log(err);
    }
};