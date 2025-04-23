import { ErrorUnauthorized } from '@/utils/errors';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { Toast } from 'vant';

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
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('jwt');
      if (token) config.headers!.Authorization = `Bearer ${token}`;
      // if (config.showLoading) {
      // Toast.loading({
      //   message: '加载中',
      //   forbidClick: true,
      //   duration: 0,
      // });
      // }
      return config;
    });
    this.instance.interceptors.response.use(
      (respopnse) => {
        // Toast.clear();
        return respopnse.data;
      },
      (error) => {
        // Toast.clear();
        if (error.response.status === 401) {
          throw error
        }
        if (error.response.status === 404) {
          // Toast('网络开小差了');
          return;
        }
        if (error.response) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 429) {
            // Toast('请求太频繁了');
            return;
          }
        }
        // Toast(error.response.data.msg);
        throw error.response.data.msg;
      }
    );
  }
  get<T = unknown>(url: string, params?: Record<string, unknown>, config?: Config) {
    return this.instance.request<Result<T>>({
      showLoading: true,
      ...config,
      url,
      params,
      method: 'get',
    }) as unknown as Promise<Result<T>>;
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
  patch<T = unknown>(url: string, data?: Record<string, JSONValue>, config?: Config) {
    return this.instance.request<Result<T>>({
      showLoading: true,
      ...config,
      url,
      data,
      method: 'patch',
    }) as unknown as Promise<Result<T>>;
  }
  delete<T = unknown>(url: string, params?: Record<string, unknown>, config?: Config) {
    return this.instance.request<Result<T>>({
      showLoading: true,
      ...config,
      url,
      params,
      method: 'delete',
    }) as unknown as Promise<Result<T>>;
  }
}

const request = new Request('/api/v1');

export default request;
