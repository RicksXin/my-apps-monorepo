import { FC, FormEvent, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Rules } from '@/api/types/form';
import { Icon, Button, Form, FormItem, MainLayout, Input } from '@/Components/index';
import { getValidationCode, signIn } from '@/api/common';
import { onError } from '@/utils/onError';
import useSignInStore from '@/stores/useSignInStore';
// import { Toast } from 'vant';
import TimerButton from '../Components/TimerButton';
import styles from './index.module.scss';

const SignInPage: FC = () => {
  // const { refreshMe } = useMeStore();
  const [route] = useSearchParams();
  const nav = useNavigate();
  const refValidationCode = useRef<{ startCount: () => void }>(null);
  const { formData, setFormData } = useSignInStore();
  const rules: Rules[] = [
    { key: 'email', type: 'required', message: '必填' },
    { key: 'email', type: 'pattern', regex: /.+@.+/, message: '邮箱地址不正确' },
    { key: 'code', type: 'required', message: '必填' },
  ];

  const onClickSendValidationCode = async () => {
    if (!/.+@.+/.test(formData.email)) {
      // Toast('邮箱地址不正确');
      return;
    }
    await getValidationCode({ email: formData.email }).catch(onError);
    if (refValidationCode.current) refValidationCode.current.startCount();
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const res = await signIn(formData).catch(onError);
    localStorage.setItem('jwt', res.data.jwt);
    const returnTo = route.get('return_to');
    // refreshMe();
    nav(returnTo || '/start', { replace: true });
  };

  return (
    <MainLayout title="登录" icon="none">
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Icon className={styles.icon} name="logo" />
          <h1 className={styles.appName}>山竹记账</h1>
        </div>
        <Form formData={formData} rules={rules} onSubmit={onSubmit}>
          <FormItem label="邮箱地址" prop="email">
            <Input
              value={formData.email}
              placeholder={'请输入邮箱，然后点击发送验证码'}
              onChange={(value) => {
                setFormData({ email: `${value}` });
              }}
            />
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Input
              value={formData.code}
              type="with_btn"
              placeholder={'请输入六位数字'}
              onChange={(value) => {
                setFormData({ code: `${value}` });
              }}
            >
              <TimerButton
                ref={refValidationCode}
                disabled={!formData.email}
                onClick={onClickSendValidationCode}
              />
            </Input>
          </FormItem>
          <FormItem>
            <Button type="submit" className={styles.login_btn}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    </MainLayout>
  );
};
export default SignInPage;
