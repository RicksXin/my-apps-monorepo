import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Catcher from './errCatcher';
import { closeLoading, startLoading } from './globalLoading';

type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };
export interface Result<R> {
  code: number;
  data: R;
  msg: string;
}
export interface Config extends Omit<AxiosRequestConfig, 'url' | 'params' | 'method'> {
  showLoading: boolean;
}

export class Request {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    this.instance.interceptors.request.use((config) => {
      // const token = localStorage.getItem('jwt');
      // if (token) config.headers!.Authorization = `Bearer ${token}`;
      startLoading(config);
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        if (response?.headers?.['content-type'] === 'application/vnd.ms-excel') {
          return response;
        }
        const res = response?.data;
        if (res?.hasOwnProperty('status')) {
          if (res.status !== 1) Catcher({ response });
        } else if (res?.hasOwnProperty('code')) {
          if (res.code !== 0) Catcher({ response });
        }
        return response.data;
      },
      (error) => {
        closeLoading();
        if (error) Catcher(error, true);
      },
    );
  }
  post<T = unknown>(url: string, data?: Record<string, JSONValue>, config?: Config) {
    return this.instance.request<Result<T>>({
      showLoading: true,
      ...config,
      url,
      data,
      method: 'post',
    }) as unknown as Promise<Result<T>>;
  }
}

const request = new Request('http://localhost:3000/');

export default request;
