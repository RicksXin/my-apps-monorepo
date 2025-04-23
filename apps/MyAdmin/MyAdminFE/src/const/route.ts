import { createRouter, RouteRecordRaw } from 'vue-router';
import Layout from '@/pages/Components/Layout';
import { history } from './history';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/enterOrder',
    meta: {
      title: '首页',
    },
    component: Layout,
    children: [
      {
        meta: {
          title: '订单录入',
        },
        path: '/enterOrder',
        component: () => import('@/pages/enterOrder'),
      },
    ],
  },
];

export const router = createRouter({ history, routes });
