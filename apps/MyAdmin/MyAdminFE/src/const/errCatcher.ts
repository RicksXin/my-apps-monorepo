import { ElNotification } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

const DURATION = 4000;
const HttpErrorList: Record<number, string> = {
  404: '请求地址错误或后端接口未部署',
  403: '没有相关权限',
  401: '登录状态过期, 需要重新登录',
  500: '后端服务有未处理的错误',
  502: '后端接口无响应',
  504: '请求超时, 可能是网络问题, 请稍后重试',
};

class HttpBizError extends Error {
  public request: any;
  public response: any;

  constructor(message: string, request?: any, response?: any) {
    super(message);
    this.name = 'HttpBizError';
    this.request = request;
    this.response = response;
  }
}

const Catcher = (error: any, isHttpError?: boolean) => {
  const router = useRouter();
  const route = useRoute();

  const { response } = error;
  if (isHttpError && response) {
    const { status } = response;
    const baseMessage = '网络请求错误';
    ElNotification.error({
      title: baseMessage,
      message: HttpErrorList[status as number],
      duration: DURATION,
    });
    if (status === 401) router.push(`/sign_in?return_to=${route.fullPath}`);
    throw new HttpBizError(baseMessage);
  } else if (response) {
    const { config, data, request } = response;
    const baseMessage = '请求失败';
    if (!config.noGlobalMessage) {
      ElNotification.error({
        title: baseMessage,
        message: data.info || data.msg || data.message || '无报错信息',
        duration: DURATION,
      });
    }
    throw new HttpBizError(baseMessage, request, data);
  }
};
export default Catcher;
