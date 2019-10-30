import axios from 'axios';

const baseURL = `https://fcm.googleapis.com/fcm/send`

const ApiFirebase = axios.create({
    baseURL,
});

ApiFirebase.interceptors.request.use(async config => {
    config.headers.Authorization = `key=AAAAw83vPfg:APA91bFovU2NsJC81SDPE-j9TbGA0kxMkPZBdJqkV8R0XMJpF6uQzmmsnWznMrWwaqYfaQDjAoxWg7Zi7VpcFtJovTChJfpWGIu51FlQgte26lQkUZGrdn8Vl_i3DD8UatoVTpo0WCC_`;
    return config;
});

export default ApiFirebase;