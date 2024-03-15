import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import config from '../../src/redux/constant';

const apiClient: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Modify request config as needed
    // For example, you can add headers or authentication tokens
    // before the request is sent

    // Add headers or other modifications to the config
    // config.headers = { ... };

    config.headers['x-api-key'] = 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj';
    // config.headers['businessUnit'] = 'EUS,MPS';

    // if (localStorage.getItem('auth-token')) {
    //   config.headers['auth-token'] = localStorage.getItem('auth-token');
    //   // config.headers['businessUnit'] = 'EUS,MPS';
    // }
    return config;
  },
  (error: any): Promise<any> => {
    // Handle request error
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Modify response data as needed
    // For example, you can extract and transform the data
    // before it is passed to the calling code

    // Transform the response data if necessary
    // response.data = { ... };

    return response;
  },
  (error: any): Promise<any> => {
    // Handle response error
    if (
      error.config.url !== 'user/login' &&
      error.response?.status === 401 &&
      !error.config._retry
    ) {
      // Access token was expired
      error.config._retry = false;
      // Rest of the code logic
      // window.location.href = '/session-expired';
    }
    return Promise.reject(error);
  },
);

export { apiClient };
