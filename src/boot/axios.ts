import { LocalStorage } from 'quasar';
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { HOME_ROUTE, ACCESS_TOKEN_KEY } from 'src/config';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const axiosParams = {
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json' },
};

const api = axios.create(axiosParams);

const accessToken = LocalStorage.getItem(ACCESS_TOKEN_KEY);

if (accessToken) {
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

// Add auth token to request headers
api.interceptors.request.use((config) => {
  const accessToken = LocalStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// handle response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      LocalStorage.remove(ACCESS_TOKEN_KEY);
      if (window.location.pathname !== HOME_ROUTE) {
        window.location.pathname = HOME_ROUTE;
      }
    }
    return Promise.reject(error);
  }
);

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
