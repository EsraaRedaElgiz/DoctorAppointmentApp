import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {Method, AxiosRequestHeaders} from 'axios';
import {USER_TOKEN} from '../constants/Constants';

const axiosInstance = axios.create({
  baseURL: 'https://doctor-graduation-project.000webhostapp.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

type axiosType = {
  method: Method;
  url: string;
  data: any;
  params: any;
  headers: AxiosRequestHeaders;
};

const Axios = async ({method, url, data, params, headers}: axiosType) => {
  let token = await AsyncStorage.getItem(USER_TOKEN);
  token= token!=null? JSON.parse(token):undefined

  const response = axiosInstance({
    method,
    url,
    data,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return response;
};

export default Axios;
