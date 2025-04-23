// import { RouteRecordRaw } from "vue-router";

export const menuList = [
  {
    id: '1',
    name: '首页',
    url: '/',
    redirect: '/enterOrder',    
    meta: {
      title: '首页',
    },
    children: [
      {
        id: '1.1',
        name: '订单录入',
        url: '/enterOrder',
        icon: 'add',
      },
    ],
  },
];
// const getRoutes = (menuList): RouteRecordRaw[] => {
//   const _import = (url: string) => import(`../pages/${url}`)
// }

