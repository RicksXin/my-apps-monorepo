import { AxiosRequestConfig } from 'axios';
import NProgress from 'nprogress';

let loadingCount = 0;

export const startLoading = (config: AxiosRequestConfig) => {
  if (!config.noLoading) {
    NProgress.start();
    loadingCount += 1;
  }
};
export const closeLoading = () => {
  loadingCount -= 1;
  if (loadingCount <= 0) NProgress.done();
};
