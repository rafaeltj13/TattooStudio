export const getToken = () =>
    localStorage.getItem('signin') ? JSON.parse(localStorage.getItem('signin')).sessionToken : '';

export default getToken;