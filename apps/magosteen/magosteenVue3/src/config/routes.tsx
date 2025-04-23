import { RouteRecordRaw } from 'vue-router';
import { useItemStore } from '@/stores/useItemStore';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  {
    path: '/welcome',
    component: () => import('@/pages/Welcome'),
    beforeEnter: (_, __, next) => {
      localStorage.getItem('skipFeature') === 'yes' ? next('/start') : next();
    },
    children: [
      {
        path: '',
        redirect: '/welcome/1',
      },
      {
        path: ':id',
        components: {
          main: () => import('@/pages/Welcome/Components/Render'),
          footer: () => import('@/pages/Welcome/Components/Action'),
        },
      },
    ],
  },
  {
    path: '/start',
    component: () => import('@/pages/StartPage/inedx'),
    beforeEnter: async (_, __, next) => {
      const itemStore = useItemStore()
      await itemStore.fetchItems()
      if (itemStore.itemList.length) {
        next('/items')
      } else {
        next()
      }
    },
  },
  {
    path: '/items',
    component: () => import('@/pages/Item'),
    children: [
      {
        path: '',
        component: () => import('@/pages/Item/components/List'),
      },
      {
        path: 'create',
        component: () => import('@/pages/Item/components/Create'),
      },

    ],
  },
  {
    path: '/tags',
    component: () => import('@/pages/Tag'),
    children: [
      {
        path: '',
        redirect: '/tags/show',
      },
      {
        path: ':id/edit',
        component: () => import('@/pages/Tag/Components/TagForm'),
      },
      {
        path: 'create',
        component: () => import('@/pages/Tag/Components/TagForm'),
      },
    ],
  },
  {
    path: '/sign_in',
    component: () => import('@/pages/SignIn'),
  },
  {
    path: '/statistics',
    component: () => import('@/pages/Statistics'),
  },
  {
    path: '/commin-soon',
    component: () => import('@/pages/CommingSoon')
  },
  {
    path: '/export',
    component: () => import('@/pages/CommingSoon')
  },
  {
    path: '/notify',
    component: () => import('@/pages/CommingSoon')
  },
];
