export const getToken = () =>
    JSON.parse(localStorage.getItem('state')).login
        ? JSON.parse(localStorage.getItem('state')).login.sessionToken
        : '';

export default getToken;