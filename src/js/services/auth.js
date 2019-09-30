export const getToken = () =>
    localStorage.getItem('signin') ? JSON.parse(localStorage.getItem('signin')).token : '';

export default getToken;