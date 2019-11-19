import axios from 'axios';
import { getToken } from './auth';
import { UTILS } from '../utils/constants';

const url = `${UTILS.apiUrl}/`

const Api = axios.create({
  baseURL: `${url}`,
});

Api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default Api;