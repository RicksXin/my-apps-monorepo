import { AxiosRequestConfig } from 'axios';
import { RouteRecordRaw } from 'vue-router';

declare module 'axios' {
  export interface AxiosRequestConfig {
    showLoading?: boolean;
    noLoading?: boolean
  }
}

declare module 'vue-router' {
  export interface RouteRecordRaw {
    noDropdown: boolean;
    children: RouteRecordRaw[]
  }
}

declare module 'vue' {
  interface HTMLAttributes {
    align?: 'left' | 'center' | 'right'
  }
}