export const getToken = () =>
    localStorage.getItem('signin') ? localStorage.getItem('signin').token : '';

export default getToken;