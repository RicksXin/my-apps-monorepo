import { FC, useEffect } from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { Icon, MainLayout, Button, FloatButton } from '@/Components/index';
import request from '@/config/request';
import { User } from '@/api/types/common';
import Loading from '@/Components/Loading';
import loadingSVG from '@/assets/icons/loading.svg'
import styles from './index.module.scss';

const StartPage: FC = () => {
  // const { data: meData, error: meError } = useSWR(
  //   '/me',
  //   async (path) => await request.get<User>(path)
  // );
  // console.log(meData);
  return (
    <MainLayout title="山竹记账" icon="menu">
      <>
        <div className={styles.icon_wrapper}>
          <Icon name="pig" className={styles.icon} />
        </div>
        <div className={styles.btn_wrapper}>
          <Link to="/items/create">
            <Button className={styles.btn}>开始记账</Button>
          </Link>
        </div>
        <Link to="/items/create">
          <FloatButton name="add" />
        </Link>
      </>
    </MainLayout>
  );
};
export default StartPage;
